package com.service;

import com.dto.PostDto;

public interface IMailService {
    void sendMail(String content);
    void sendEmailPending(PostDto postDto);
}
