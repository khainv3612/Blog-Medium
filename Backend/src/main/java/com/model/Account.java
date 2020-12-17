package com.model;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "ACCOUNT")
@Data
@NamedQueries({
        @NamedQuery(name = "Account.getPassById"
                , query = "select a.password from Account  a where a.id=:id"),
        @NamedQuery(name = "Account.updatePassById",
                query = "update Account a set a.password=:newPass where a.id=:id")
})
public class Account implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    @NotNull
    private String userName;

    private String password;
    @Column(unique = true)
    @NotNull
    private String email;
    @ManyToOne
    private Role role;

    @ManyToOne
    private TypeAccount typeAccount;

    private String image = "assets/img/avatar.jpeg";

    private String address;
    private String phone;
    private Date birthday;
    private String description;

    public TypeAccount getTypeAccount() {
        return typeAccount;
    }

    public void setTypeAccount(TypeAccount typeAccount) {
        this.typeAccount = typeAccount;
    }

    public Account(Long id, String userName, String password, String email, Role role, TypeAccount typeAccount, String image) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.role = role;
        this.typeAccount = typeAccount;
        this.image = image;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
