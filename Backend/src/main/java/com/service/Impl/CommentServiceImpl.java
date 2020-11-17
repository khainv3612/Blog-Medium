package com.service.Impl;

import com.dto.CommentDTO;
import com.model.Comment;
import com.repository.CommentRepository;
import com.service.ICommentService;
import com.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CommentServiceImpl implements ICommentService {

    @Autowired
    private IPostService postService;
    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<CommentDTO> getCommentByIdPost(Long idPost) {
        List<Comment> commentList = commentRepository.findAllByPost(postService.findById(idPost));
        List<CommentDTO> commentDTOS = new ArrayList<>();
        if (null != commentList && commentList.size() > 0) {
            for (Comment c : commentList) {
                commentDTOS.add(convertToDTO(c));
            }
        }
        return commentDTOS;
    }

    @Override
    public CommentDTO convertToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        if (null != comment) {
            commentDTO.setAvatar(comment.getAuthor().getImage());
            commentDTO.setContent(comment.getContent());
            commentDTO.setId(comment.getId());
            commentDTO.setLastUpdate(convertLastUpdate(comment.getLastUpdate()));
        }
        return commentDTO;
    }

    @Override
    public String convertLastUpdate(Instant lastUpdate) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
        Date update = Date.from(lastUpdate);
        return formatter.format(update);
    }

    @Override
    public void addNewComment(Comment comment) {
        commentRepository.save(comment);
    }
}
