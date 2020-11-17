package com.service.Impl;

import com.model.Account;
import com.model.Role;
import com.repository.UserRepository;
import com.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements IAccountService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    Role roleAdmin;
    @Autowired
    Role roleUser;

    @Override
    public Account findByUsername(String username) {
        Account account = userRepository.findByUserName(username).get();
        return account;
    }

    @Override
    public Account findByEmail(String email) {
        Account account = userRepository.findByEmail(email).get(0);
        return account;
    }

    @Override
    public Boolean signInByGoogle(OAuth2AuthenticatedPrincipal user) {
        if (checkEmailExist(user.getAttribute("email"))) ;
        return null;
    }

    @Override
    public Boolean checkEmailExist(String email) {
        return !userRepository.findByEmail(email).isEmpty();
    }

    @Override
    public Boolean checkUsernameExist(String username) {
        return findByUsername(username) == null;
    }

    @Override
    public List<Account> getAdmin() {
        List<Account> lst = userRepository.getAllByRole(roleAdmin);
        return lst;
    }

}
