package com.dto;

import lombok.Data;

@Data
public class PagingDTO {
    public String username;
    public int page;
    public int size;
}
