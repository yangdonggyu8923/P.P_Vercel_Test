package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@EnableAutoConfiguration(exclude={MongoAutoConfiguration.class})
@SpringBootApplication
public class WebfluxApplication {


	public static void main(String[] args) {
		SpringApplication.run(WebfluxApplication.class, args);
	}

}
