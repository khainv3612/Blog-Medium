package com.service;

import com.dto.LoginRequest;
import com.dto.RegisterRequest;
import com.model.Account;
import com.model.Role;
import com.repository.UserRepository;
import com.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private Role roleUser;
//    @Qualifier("IAccountService")
    @Autowired
    private IAccountService accountService;

    public void signup(RegisterRequest registerRequest) {
        Account account = new Account();
        account.setUserName(registerRequest.getUsername());
        account.setEmail(registerRequest.getEmail());
        account.setPassword(encodePassword(registerRequest.getPassword()));
        account.setRole(roleUser);
        userRepository.save(account);
    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public AuthenticationResponse login(LoginRequest loginRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String authenticationToken = jwtProvider.generateToken(authenticate);
        return new AuthenticationResponse(authenticationToken, loginRequest.getUsername(),
                accountService.findByUsername(loginRequest.getUsername()).getRole().getRole());
    }

    public Optional<User> getCurrentUser() {
        User principal = (User) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return Optional.of(principal);
    }
}
