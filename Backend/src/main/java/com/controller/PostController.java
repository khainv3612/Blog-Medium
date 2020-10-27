package com.controller;

import com.dto.PostDto;
import com.dto.PostPendingDTO;
import com.model.Post;
import com.service.IPostService;
import com.service.Impl.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/posts/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {

    @Autowired
    private IPostService postServiceImpl;

    @PostMapping
    public ResponseEntity createPost(@RequestBody PostDto postDto) throws IOException {
        if (!postServiceImpl.createPost(postDto)) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostDto>> showAllPosts() {
        return new ResponseEntity<>(postServiceImpl.showAllPosts(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PostDto> getSinglePost(@PathVariable @RequestBody Long id) {
        return new ResponseEntity<>(postServiceImpl.readSinglePost(id), HttpStatus.OK);
    }

    @GetMapping("/post-pending")
    @ResponseBody
    public ResponseEntity<List<PostPendingDTO>> getAllPostPending() throws FileNotFoundException {
        List<PostPendingDTO> list = postServiceImpl.getAllPostPending();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/publish-post")
    public ResponseEntity publishPost(@RequestBody Long id) {
        int result = postServiceImpl.publishPost(id);
        if (result == 0) {
            new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/delete-post")
    public ResponseEntity deletePost(@RequestBody Long id) {
        boolean result = postServiceImpl.deletePost(id);
        if (result) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/my-post")
    public ResponseEntity<List<Post>> getMyPost() {
        List<Post> list = postServiceImpl.getMyPost();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
