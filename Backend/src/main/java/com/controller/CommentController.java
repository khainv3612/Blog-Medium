package com.controller;

import com.dto.CommentDTO;
import com.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommentController {
    @Autowired
    private ICommentService commentService;

    @GetMapping("/get/{id}")
    public ResponseEntity<List<CommentDTO>> getAllCommentByPost(@PathVariable("id") Long id) {
        List<CommentDTO> commentDTOS = commentService.getCommentByIdPost(id);
        return new ResponseEntity<>(commentDTOS, HttpStatus.OK);
    }

    @PostMapping("/add-comment")
    public void addNewComment() {

    }
}
