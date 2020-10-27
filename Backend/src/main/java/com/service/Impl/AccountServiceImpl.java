package com.service.Impl;

import com.model.Account;
import com.model.Role;
import com.repository.UserRepository;
import com.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements IAccountService {
    @Autowired
    UserRepository userRepository;
    @Override
    public Account findByUsername(String username) {
        Account account = userRepository.findByUserName(username).get();
        return account;
    }

}
