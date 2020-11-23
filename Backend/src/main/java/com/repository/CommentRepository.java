package com.repository;

import com.model.Comment;
import com.model.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CommentRepository extends PagingAndSortingRepository<Comment, Long> {
    List<Comment> findAllByPost(Post post, Pageable pageable);

    Long getNextId();

    Integer countComment(Long idPost);

    void deleteAllByPost_Id(Long idPost);
}
