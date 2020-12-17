package com.dto;

import lombok.Data;

@Data
public class ResetPassDTO {
    private Long idUser;
    private String passConfirm;
    private String newPass;
}
