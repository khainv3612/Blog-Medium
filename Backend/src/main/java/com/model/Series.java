package com.model;

import javax.persistence.*;

@Table
@Entity(name = "SERIES")
public class Series {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idSeries;
    
    private String nameSeries;
}
