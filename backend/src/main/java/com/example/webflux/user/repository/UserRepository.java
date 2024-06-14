package com.example.webflux.user.repository;

import com.example.webflux.user.domain.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Repository
public interface UserRepository extends ReactiveMongoRepository<UserModel, String> {

    Flux<UserModel> findByLastName(String lastName);
    Mono<UserModel> findByEmail(String email);


}
