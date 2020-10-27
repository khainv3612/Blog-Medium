package com.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ACCOUNT")
public class Account implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String userName;
    
    private String password;
    
    private String email;
    @ManyToOne
    private Role role;

    public Account(Long id, String userName, String password, String email, Role role) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public Account() {

    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
