package com.example.demo.user.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.*;
import com.example.demo.common.domain.Messenger;
import com.example.demo.user.domain.UserDTO;
import com.example.demo.user.service.UserService;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RequestMapping(path = "/api/users")
public class UserController {


    private final UserService userService;

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
}
