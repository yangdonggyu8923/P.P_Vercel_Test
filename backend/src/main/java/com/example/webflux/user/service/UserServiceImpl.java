package com.example.webflux.user.service;

import com.example.webflux.user.domain.UserModel;
import com.example.webflux.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public Flux<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public Mono<UserModel> getUserDetailByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Mono<UserModel> getUserDetailById(String id) {
        return userRepository.findById(id);
    }

    public Mono<UserModel> addUser(UserModel user) {
        return userRepository.save(user);
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
}
