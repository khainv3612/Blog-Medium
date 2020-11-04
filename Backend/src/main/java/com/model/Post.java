package com.model;

import org.springframework.data.jpa.repository.Query;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Table(name = "POST")
@NamedQueries({
        @NamedQuery(name = "Post.getNextId",
                query = "SELECT MAX(id) FROM Post "),
        @NamedQuery(name = "Post.publishPost",
                query = "UPDATE Post t set t.status=1 where t.id=:id"),
        @NamedQuery(name = "Post.getUrlContentById",
                query = "SELECT  p.content from Post p where p.id=:id"),
        @NamedQuery(name = "Post.getStatusById",
        query = "select  p.status from Post  p where p.id=:id")
})
public class Post {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotEmpty
    @NotNull
    private String title;
    @NotEmpty
    @NotNull
    private String image;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Account getAccountCreate() {
        return accountCreate;
    }

    public void setAccountCreate(Account accountCreate) {
        this.accountCreate = accountCreate;
    }

    @NotEmpty
    private String content;

    private Instant lastUpdate;
    @ManyToOne
    private Account accountCreate;
    @ManyToOne
    private Status status;
    @ManyToOne
    private Category category;
    @ManyToOne
    private Rating rating;
    @ManyToOne
    private Series series;

    public Post() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Instant lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Account getUserCreate() {
        return accountCreate;
    }

    public void setUserCreate(Account accountCreate) {
        this.accountCreate = accountCreate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public Series getSeries() {
        return series;
    }

    public void setSeries(Series series) {
        this.series = series;
    }

    public Post(Long id, @NotBlank String title, @NotEmpty String content, Instant lastUpdate, @NotBlank Account accountCreate, @NotBlank @NotEmpty Status status, @NotBlank @NotEmpty Category category, Rating rating, Series series) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.lastUpdate = lastUpdate;
        this.accountCreate = accountCreate;
        this.status = status;
        this.category = category;
        this.rating = rating;
        this.series = series;
    }

    public Post(Long id, @NotEmpty String title, @NotEmpty String image, @NotEmpty String content, Instant lastUpdate, Account accountCreate, Status status) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.content = content;
        this.lastUpdate = lastUpdate;
        this.accountCreate = accountCreate;
        this.status = status;
    }
}
