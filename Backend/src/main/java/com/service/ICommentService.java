package com.service;

import com.dto.CommentDTO;
import com.model.Comment;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public interface ICommentService {
    List<CommentDTO> getCommentByIdPost(Long idPost, int page, int size);

    CommentDTO convertToDTO(Comment comment);

    String convertLastUpdate(Instant lastUpdate);

    CommentDTO addNewComment(CommentDTO commentDTO);

    Comment convertToComment(CommentDTO commentDTO);

    Long getNextId();

    Comment getById(Long id);

    Integer countComment(Long idPost);
}
