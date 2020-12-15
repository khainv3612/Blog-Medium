package com.repository;

import com.model.Comment;
import com.model.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPost(Post post, Pageable pageable);

    Long getNextId();

    Integer countComment(Long idPost);

    void deleteAllByPost_Id(Long idPost);
}
