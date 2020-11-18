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

    @GetMapping("/get/{id}/{page}/{size}")
    public ResponseEntity<List<CommentDTO>> getAllCommentByPost(@PathVariable("id") Long id, @PathVariable("page") int page,
                                                                @PathVariable("size") int size) {
        List<CommentDTO> commentDTOS = commentService.getCommentByIdPost(id, page, size);
        return new ResponseEntity<>(commentDTOS, HttpStatus.OK);
    }

    @PostMapping("/add-comment")
    public ResponseEntity<CommentDTO> addNewComment(@RequestBody CommentDTO commentDTO) {
        CommentDTO commentDTO1 = commentService.addNewComment(commentDTO);
        if (null != commentDTO1) {
            return new ResponseEntity<>(commentDTO1, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.FAILED_DEPENDENCY);
    }

    @GetMapping("/count-comment/{id}")
    public ResponseEntity<Integer> countComment(@PathVariable("id") Long id) {
        Integer num = commentService.countComment(id);
        return new ResponseEntity<>(num, HttpStatus.OK);
    }
}
