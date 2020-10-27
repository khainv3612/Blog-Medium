package com.model;

import javax.persistence.*;

@Entity
@Table(name = "RATING")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idRating;

    
    private String rating;
}
