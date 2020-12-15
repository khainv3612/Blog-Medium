package com.repository;

import com.model.Post;
import com.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAllByStatusEqualsOrderByIdDesc(Status status, Pageable pageable);

    Long getNextId();

    List<Post> getAllByAccountCreate_Id(Long id);


    Page<Post> getAllByAccountCreate_UserNameOrderByIdDesc(String username, Pageable pageable);

    Page<Post> getAllByAccountCreate_UserNameAndStatusEqualsOrderByIdDesc(String username, Status status, Pageable pageable);
}
