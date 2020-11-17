package com.service;

import com.dto.CommentDTO;
import com.model.Comment;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public interface ICommentService {
    List<CommentDTO> getCommentByIdPost(Long idPost);

    CommentDTO convertToDTO(Comment comment);

    String convertLastUpdate(Instant lastUpdate);

    void addNewComment(Comment comment);
}
