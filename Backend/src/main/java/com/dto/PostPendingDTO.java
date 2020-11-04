package com.dto;

import java.io.Serializable;

public class PostPendingDTO implements Serializable {
    private Long idPending;
    private String title;
    private String content;
    private String lastUpdate;
    private String userCreate;
    private String avatarAuthor;

    public String getAvatarAuthor() {
        return avatarAuthor;
    }

    public void setAvatarAuthor(String avatarAuthor) {
        this.avatarAuthor = avatarAuthor;
    }


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    private String image;

    public Long getIdPending() {
        return idPending;
    }

    public void setIdPending(Long idPending) {
        this.idPending = idPending;
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

    public String getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(String lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getUserCreate() {
        return userCreate;
    }

    public void setUserCreate(String userCreate) {
        this.userCreate = userCreate;
    }

    public PostPendingDTO(Long idPending, String title, String content, String lastUpdate, String userCreate, String image,String avatarAuthor) {
        this.idPending = idPending;
        this.title = title;
        this.content = content;
        this.lastUpdate = lastUpdate;
        this.userCreate = userCreate;
        this.image = image;
        this.avatarAuthor=avatarAuthor;
    }

    public PostPendingDTO() {
    }
}
