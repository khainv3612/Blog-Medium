package com.dto;

import com.model.Role;
import com.model.TypeAccount;
import lombok.Data;

import java.time.Instant;

@Data
public class UserDetailDTO {
    private Long id;
    private String userName;

    private String password;
    private String email;

    private String image;

    private String address;
    private String phone;
    private String birthday;
    private String description;

}
