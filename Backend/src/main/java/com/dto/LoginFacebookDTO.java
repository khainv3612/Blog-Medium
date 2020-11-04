package com.dto;

public class LoginFacebookDTO extends LoginSocialAbstactDTO{
    public LoginFacebookDTO() {
    }
    public LoginFacebookDTO(String username, String email, String image) {
        this.username = username;
        this.email = email;
        this.image = image;
    }
}
