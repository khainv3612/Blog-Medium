package com.model;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Table(name = "COMMENT")
@NamedQueries({
        @NamedQuery(name = "Comment.getNextId",
                query = "SELECT MAX(c.id) FROM Comment c"),
        @NamedQuery(name = "Comment.countComment",
                query = "select count (c.id) from Comment c where c.post.id=:idPost")
})
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    private Post post;
    @NotNull
    private String content;
    @NotNull
    private Instant lastUpdate;
    @ManyToOne
    private Account author;

    private Long parentId;

    public Comment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Account getAuthor() {
        return author;
    }

    public void setAuthor(Account author) {
        this.author = author;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long commentParent) {
        this.parentId = commentParent;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Comment(Long id, Post post, @NotNull String content, @NotNull Instant lastUpdate) {
        this.id = id;
        this.post = post;
        this.content = content;
        this.lastUpdate = lastUpdate;
    }
}
