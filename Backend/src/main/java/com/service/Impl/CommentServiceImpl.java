package com.service.Impl;

import com.dto.CommentDTO;
import com.model.Comment;
import com.repository.CommentRepository;
import com.service.IAccountService;
import com.service.ICommentService;
import com.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Component("CommentService")
public class CommentServiceImpl implements ICommentService {

    @Autowired
    private IPostService postService;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private IAccountService accountService;

    @Override
    public List<CommentDTO> getCommentByIdPost(Long idPost, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Comment> commentList = commentRepository.findAllByPost(postService.findById(idPost), pageable);
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
            if (null != comment.getId())
                commentDTO.setId(comment.getId());
            commentDTO.setLastUpdate(convertLastUpdate(comment.getLastUpdate()));
            commentDTO.setIdPost(comment.getPost().getId());
            commentDTO.setUsername(comment.getAuthor().getUserName());
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
//    @Transactional
    public CommentDTO addNewComment(CommentDTO commentDTO) {
        Comment comment = convertToComment(commentDTO);
        Long idJustInsert = commentRepository.save(comment).getId();
        Comment comment1 = getById(idJustInsert);
        CommentDTO commentDTO1 = convertToDTO(comment1);
        return commentDTO1;
    }

    @Override
    public Comment convertToComment(CommentDTO commentDTO) {
        Comment comment = new Comment();
        if (null != commentDTO) {
            comment.setAuthor(accountService.findByUsername(commentDTO.getUsername()));
            comment.setContent(commentDTO.getContent());
            comment.setLastUpdate(Instant.now());
            comment.setPost(postService.findById(commentDTO.getIdPost()));
        }
        return comment;
    }

    @Override
    public Long getNextId() {
        Long id = commentRepository.getNextId();
        return id;
    }

    @Override
    public synchronized Comment getById(Long id) {
        Comment comment = commentRepository.findById(id).get();
        return comment;
    }

    @Override
    public Integer countComment(Long idPost) {
        Integer num = commentRepository.countComment(idPost);
        return num;
    }

    @Override
    public void deleteAllByPostId(Long idPost) {
        commentRepository.deleteAllByPost_Id(idPost);
    }
}
