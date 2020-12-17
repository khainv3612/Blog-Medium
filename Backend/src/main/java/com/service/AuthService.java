package com.service;

import com.dto.*;
import com.model.Account;
import com.model.Role;
import com.model.TypeAccount;
import com.repository.UserRepository;
import com.security.JwtProvider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.lang.reflect.Field;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;
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
    @Autowired
    private Environment environment;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private EntityManager entityManager;

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
        Account account = accountService.findByUsername(loginRequestNomal.getUsername());
        String avatar = "";
        if (null != account.getImage())
            avatar = account.getImage();
        return new AuthenticationResponse(authenticationToken, loginRequestNomal.getUsername(),
                account.getRole().getRole(), avatar);
    }

    public Optional<User> getCurrentUser() {
        User principal = (User) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return Optional.of(principal);
    }

    synchronized public String signupSocial(LoginSocialAbstactDTO dto) {
        String role = "";
        try {
            if (!accountService.checkEmailExist(dto.getEmail())) {
                role = roleUser.getRole();
                Account account = new Account();
                account.setUserName(dto.getUsername());
                account.setEmail(dto.getEmail());
                account.setTypeAccount(typeGoogle);
                account.setImage(dto.getImage());
                account.setRole(roleUser);
                userRepository.save(account);
            }
            role = accountService.findByEmail(dto.getEmail()).getRole().getRole();
        } catch (Exception e) {
            e.getMessage();
        } finally {
            return role;
        }

    }

    @Transactional
    public boolean checkPassMatch(Long idUser, String checkPass) {
        try {
            Query query1 = entityManager.createNamedQuery("Account.getPassById");
            query1.setParameter("id", idUser);
            String currentPass = query1.getResultList().get(0).toString();
            return passwordEncoder.matches(checkPass, currentPass);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    public boolean updateProfile(UserDetailDTO dto) {
        try {
            Account account = userRepository.findByUserName(dto.getUsername()).get();
            account.setImage(dto.getImage());
            account.setEmail(dto.getEmail());
            account.setUserName(dto.getUsername());
            account.setAddress(dto.getAddress());
            account.setBirthday(new SimpleDateFormat("yyyy-MM-dd").parse(dto.getBirthday()));
            account.setDescription(dto.getDescription());
            account.setPhone(dto.getPhone());
            userRepository.saveAndFlush(account);
            return true;
        } catch (ParseException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public boolean updatePassword(ResetPassDTO dto) {
        try {
            Query query1 = entityManager.createNamedQuery("Account.updatePassById");
            query1.setParameter("newPass", encodePassword(dto.getNewPass()));
            query1.setParameter("id", dto.getIdUser());
            int result = query1.executeUpdate();
            return (result > 0);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}


