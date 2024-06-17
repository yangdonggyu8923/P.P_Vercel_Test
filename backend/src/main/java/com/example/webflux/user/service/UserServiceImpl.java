package com.example.webflux.user.service;

import com.example.webflux.common.domain.Messenger;
import com.example.webflux.security.component.JwtProvider;
import com.example.webflux.security.domain.TokenModel;
import com.example.webflux.security.service.TokenServiceImpl;
import com.example.webflux.user.domain.UserDTO;
import com.example.webflux.user.domain.UserModel;
import com.example.webflux.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final TokenServiceImpl tokenService;

    @Value("${jwt.expiration.refresh}")
    private long refreshTokenExpiration;

    @Value("${jwt.expiration.access}")
    private long accessTokenExpiration;

    public Flux<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public Mono<UserModel> getUserDetailByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Mono<UserModel> getUserDetailById(String id) {
        return userRepository.findById(id);
    }

    public Mono<Messenger> addUser(UserModel user) {
        return userRepository.save(user).flatMap(i -> Mono.just(Messenger.builder().message("SUCCESS").build()))
                .switchIfEmpty(Mono.just(Messenger.builder().message("FAILURE").build()))
                ;
    }

    public Mono<UserModel> updateUser(String id, UserModel user) {
        return userRepository.findById(id).map(Optional::of).defaultIfEmpty(Optional.empty())
                .flatMap(optionalUser -> {
                    if (optionalUser.isPresent()) {
                        user.setUserId(id);
                        return userRepository.save(user);
                    }

                    return Mono.empty();
                });
    }

    public Mono<Void> deleteUser(String id) {
        return userRepository.deleteById(id);
    }

    public Mono<Void> deleteAllUsers() {
        return userRepository.deleteAll();
    }

    public Flux<UserModel> findByLastName(String lastName) {
        return userRepository.findByLastName(lastName);
    }

    public Mono<Messenger> login(UserModel user) {
        log.info("로그인에 사용되는 이메일 : {}",user.getEmail());

        var accessToken = jwtProvider.generateToken(null, user, "accessToken");
        if(accessToken.equals("")){
            log.info("접속토큰 발급 실패");
        }

        var refreshToken = jwtProvider.generateToken(null, user, "refreshToken");
        if(refreshToken.equals("")){
            log.info("리프레시 토큰 발급 실패");
        }

        log.info("로그인 성공시 접속토큰  : {}", accessToken);
        log.info("로그인 성공시 재생토큰  : {}", refreshToken);

        tokenService.saveRefreshToken(user.getEmail(), refreshToken, refreshTokenExpiration);


        // Sync
        return userRepository.findByEmail(user.getEmail())
                .filter(i -> i.getPassword().equals(user.getPassword()))
                .map(i -> UserDTO.builder().email(i.getEmail()).firstName(i.getFirstName()).lastName(i.getLastName()).build())
                .log()
                .map(i -> Messenger.builder().message("SUCCESS").data(i)
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .accessTokenExpiration(accessTokenExpiration)
                        .refreshTokenExpiration(refreshTokenExpiration)
                        .build());

//        return tokenService.saveRefreshToken(user.getEmail(), refreshToken, refreshTokenExpiration)
//                .flatMap(refreshToken1 ->
//                        userRepository.findByEmail(user.getEmail())
//                                .filter(i -> i.getPassword().equals(user.getPassword()))
//                                .map(i -> UserDTO.builder().email(i.getEmail()).firstName(i.getFirstName()).lastName(i.getLastName()).build())
//                                .log()
//                                .map(i -> Messenger.builder().message("SUCCESS").data(i)
//                                        .accessToken(accessToken)
//                                        .refreshToken(refreshToken1.getRefreshToken())
//                                        .build()));
    }
    public Mono<Messenger> login2(UserModel user) {
        log.info("로그인 2 에 사용되는 이메일 : {}",user.getEmail());
        // Async
        // attach 방식으로 사용
        return userRepository.findByEmail(user.getEmail())
                .filter(i -> i.getPassword().equals(user.getEmail()))
                .flatMap(i -> Mono.just(UserDTO.builder().email(i.getEmail()).firstName(i.getFirstName()).lastName(i.getLastName()).build()))
                .log()
                .flatMap(i -> Mono.just(Messenger.builder().data(i).build()))

                ;
    }
}