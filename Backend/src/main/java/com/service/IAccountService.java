package com.service;

import com.model.Account;
import com.model.Role;
import org.springframework.stereotype.Service;

@Service
public interface IAccountService {
    Account findByUsername(String username);
}
