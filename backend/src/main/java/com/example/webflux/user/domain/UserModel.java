package com.example.webflux.user.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.*;

@Data
@Document(collection = "users")
@Builder
@AllArgsConstructor
@ToString(exclude = "userId")
@NoArgsConstructor

public class UserModel {

    @Id
    String userId ;
    String firstName ;
    String lastName ;
    String email;
    String password ;


//    List <RoleModel> roles ;



}
