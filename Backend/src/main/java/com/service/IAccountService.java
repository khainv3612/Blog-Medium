package com.service;

import com.dto.UserDetailDTO;
import com.model.Account;
import com.model.Role;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IAccountService {
    Account findByUsername(String username);

    Account findByEmail(String email);

    Boolean signInByGoogle(OAuth2AuthenticatedPrincipal user);

    Boolean checkEmailExist(String email);

    Boolean checkUsernameExist(String username);

    List<Account> getAdmin();

    UserDetailDTO getUserDetails(String username);
}
