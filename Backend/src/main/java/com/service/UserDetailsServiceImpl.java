package com.service;

import com.model.Account;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = userRepository.findByUserName(username).orElseThrow(() ->
                new UsernameNotFoundException("No user found " + username));
        UserDetails userDetails=new org.springframework.security.core.userdetails.User(account.getUserName(),
                account.getPassword(),
                true, true, true, true,
                getAuthorities(account.getRole().getRole()));
        return userDetails;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(String role_user) {
        return Collections.singletonList(new SimpleGrantedAuthority(role_user));
    }
}
