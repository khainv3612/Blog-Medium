package com.model;

import javax.persistence.*;

@Entity
@Table(name = "STATUS")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idStatus;
    
    private String status;

    public Status() {
    }

    public Status(Long idStatus) {
        this.idStatus = idStatus;
    }

    public Long getIdStatus() {
        return idStatus;
    }

    public void setIdStatus(Long idStatus) {
        this.idStatus = idStatus;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
