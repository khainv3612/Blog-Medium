package com.repository;

import com.model.Comment;
import com.model.Post;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CommentRepository extends PagingAndSortingRepository<Comment, Long> {
    List<Comment> findAllByPost(Post post);
}
