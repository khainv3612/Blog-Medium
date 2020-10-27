package com.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "CATEGORY")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCategory;

    
    @NotEmpty
    private String category;
}
