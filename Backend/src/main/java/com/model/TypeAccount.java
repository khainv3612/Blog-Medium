package com.model;


import javax.persistence.*;

@Entity
@Table(name = "TYPE_ACCOUNT")
public class TypeAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String typeAccount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeAccount() {
        return typeAccount;
    }

    public void setTypeAccount(String typeAccount) {
        this.typeAccount = typeAccount;
    }

    public TypeAccount() {
    }

    public TypeAccount(Long id) {
        this.id = id;
    }
}
