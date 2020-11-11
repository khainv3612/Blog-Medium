package com.service;

import com.dto.LoginGoogleDTO;
import com.dto.LoginRequestNomal;
import com.dto.LoginSocialAbstactDTO;
import com.dto.RegisterRequest;
import com.model.Account;
import com.model.Role;
import com.model.TypeAccount;
import com.repository.UserRepository;
import com.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private TypeAccount typeNomal;
    @Autowired
    private TypeAccount typeGoogle;
    @Autowired
    private TypeAccount typeFacebook;
    @Autowired
    private TypeAccount typeGithub;

    public void signup(RegisterRequest registerRequest) {
        Account account = new Account();
        account.setUserName(registerRequest.getUsername());
        account.setEmail(registerRequest.getEmail());
        account.setPassword(encodePassword(registerRequest.getPassword()));
        account.setRole(roleUser);
        account.setTypeAccount(typeNomal);
        userRepository.save(account);
    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public AuthenticationResponse login(LoginRequestNomal loginRequestNomal) {
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequestNomal.getUsername(),
                        loginRequestNomal.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String authenticationToken = jwtProvider.generateToken(authenticate);
        return new AuthenticationResponse(authenticationToken, loginRequestNomal.getUsername(),
                accountService.findByUsername(loginRequestNomal.getUsername()).getRole().getRole());
    }

    public Optional<User> getCurrentUser() {
        User principal = (User) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return Optional.of(principal);
    }

    synchronized public String                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      signupSocial(LoginSocialAbstactDTO dto) {
        String role = "";
        try {
            if (!accountService.checkEmailExist(dto.getEmail())) {
                Account account = new Account();
                account.setUserName(dto.getUsername());
                account.setEmail(dto.getEmail());
                account.setTypeAccount(typeGoogle);
                account.setImage(dto.getImage());
                account.setRole(roleUser);
                userRepository.save(account);
                role = roleUser.getRole();
            }
            role = accountService.findByEmail(dto.getEmail()).getRole().getRole();
        } catch (Exception e) {
            e.getMessage();
        }
        return role;
    }
}
