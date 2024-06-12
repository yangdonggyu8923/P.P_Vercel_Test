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
import com.example.webflux.user.domain.UserDTO;
import com.example.webflux.user.service.UserService;

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
    public Mono<Messenger> login(@RequestBody UserDTO param) {
        log.info("::: login controller parameter ",param.toString());
        // Messenger messenger = service.login(param);
        Messenger m = Messenger.builder().message("SUCCESS").build();
        Mono<Messenger> helloWorld = Mono.just(m);
        return helloWorld;
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
    public Mono<UserModel> createUser(@RequestBody UserModel user) {
        return userService.addUser(new UserModel(
                user.getUserId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPassword(),
                user.getRoles()
        ));
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
