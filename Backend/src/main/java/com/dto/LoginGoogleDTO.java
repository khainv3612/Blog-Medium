package com.dto;

public class LoginGoogleDTO extends LoginSocialAbstactDTO {
      public LoginGoogleDTO() {
    }

    public LoginGoogleDTO(String username, String email, String image) {
        this.username = username;
        this.email = email;
        this.image = image;
    }


}
