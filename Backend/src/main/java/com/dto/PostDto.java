package com.dto;

public class PostDto {
    private Long id;
    private String content;
    private String title;
    private String username;
    private String image;
    private String lastUpdate;
    private String avatarAuthor;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(String lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getAvatarAuthor() {
        return avatarAuthor;
    }

    public void setAvatarAuthor(String avatarAuthor) {
        this.avatarAuthor = avatarAuthor;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
