package com.controller;

import com.dto.LoginFacebookDTO;
import com.dto.LoginGoogleDTO;
import com.model.Account;
import com.service.AuthService;
import com.service.AuthenticationResponse;
import com.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/login-social/")
public class SocialLoginController {
    @Autowired
    private Environment environment;
    @Autowired
    AuthService authService;
    @Autowired
    private IAccountService accountService;

    @PostMapping("/signin/google")
    public ResponseEntity<String> loginGoogle(@RequestBody LoginGoogleDTO dto) {
        String role = authService.signupSocial(dto);
        if (!role.equals("")) {
            return new ResponseEntity<>(role, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signin/facebook")
    public ResponseEntity<String> loginFacebook(@RequestBody LoginFacebookDTO dto) {
        String role = authService.signupSocial(dto);
        if (!role.equals("")) {
            return new ResponseEntity<>(role, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
