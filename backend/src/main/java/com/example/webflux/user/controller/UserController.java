package com.example.webflux.user.controller;

import com.example.webflux.user.domain.UserModel;
import com.example.webflux.user.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.*;
import com.example.webflux.common.domain.Messenger;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RequestMapping(path = "/api/users")
public class UserController {


    private final UserServiceImpl userService;

    @PostMapping("/login")
    public Mono<Messenger> login(@RequestBody UserModel param) {
        log.info("::: 로그인 컨트롤러 파라미터 : {}",param.toString());

        // Messenger m = Messenger.builder().message("SUCCESS").build();
        // Mono<ResponseEntity<Messenger>> helloWorld = Mono.just(ResponseEntity.ok(m));

        //switchIfEmpty는 전달받은 값이 null인 경우 새로운 Mono/Flux 로 변환
        //defaultIfEmpty 는  defaultIfEmpty는 null을 대체하는 값을 지정한다

        return userService.login(param).defaultIfEmpty(Messenger.builder().message("FAILURE").build());
    }



    @GetMapping("/logout")
    public Mono<Messenger> logout(@RequestHeader("Authorization") String accessToken) {
        log.info("1- logout request : {}", accessToken);
        Messenger m = Messenger.builder().message("SUCCESS").build();
        Mono<Messenger> logout = Mono.just(m);
        return logout;
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Flux<UserModel> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/detail/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<UserModel> getUserById(@PathVariable("userId") String userId) {
        return userService.getUserDetailById(userId);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Messenger> saveUser(@RequestBody UserModel user) {
        return userService.addUser(user);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<UserModel> updateUser(@PathVariable("id") String id, @RequestBody UserModel user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteUser(@PathVariable("id") String id) {
        return userService.deleteUser(id);
    }

    @DeleteMapping("/users")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteAllUsers() {
        return userService.deleteAllUsers();
    }



}