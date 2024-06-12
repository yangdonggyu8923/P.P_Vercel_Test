package com.example.demo.user.repository;

import java.util.Optional;

import com.example.demo.user.domain.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends MongoRepository<UserModel, String>{


}
