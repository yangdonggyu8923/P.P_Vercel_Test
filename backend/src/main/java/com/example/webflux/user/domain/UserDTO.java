package com.example.webflux.user.domain;

import lombok.*;
import org.springframework.stereotype.Component;
import java.util.List;

@Data
@Component
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {
    private String userId;
    private String lastName;
    // private String password; 프론트로 보내는 값은 비번을 지운다
    private String firstName;
    private String email;
    // private List<RoleModel> roles;
}
