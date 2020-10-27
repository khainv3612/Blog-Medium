package com.repository;

import com.model.Post;
import com.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {
    List<Post> findAllByStatusEqualsOrderByIdDesc(Status status);

    Long getNextId();

    List<Post> getAllByAccountCreate_Id(Long id);
}
