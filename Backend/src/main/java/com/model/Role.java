package com.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "ROLE")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idRole;

    public Role() {
    }

    private String role;

    public Role(Long idRole) {
        this.idRole = idRole;
    }

    public Long getIdRole() {
        return idRole;
    }

    public void setIdRole(Long idRole) {
        this.idRole = idRole;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Role(Long idRole, String role) {
        this.idRole = idRole;
        this.role = role;
    }
}
