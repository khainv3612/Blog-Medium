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
    public ResponseEntity<List<PostPendingDTO>> getAllPostPending(@RequestParam(name = "page", defaultValue = "0") int page,
                                                                  @RequestParam(name = "size", defaultValue = "10") int size) throws FileNotFoundException {
        List<PostPendingDTO> list = postServiceImpl.getAllPostPending(page, size);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

//    @GetMapping("/post-publish")
//    @ResponseBody
//    public ResponseEntity<List<PostDto>> getAllPostPublish() throws FileNotFoundException {
//        List<PostDto> list = postServiceImpl.getAllPostPublish();
//        return new ResponseEntity<>(list, HttpStatus.OK);
//    }

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

    @GetMapping("/my-post/published")
    public ResponseEntity<List<PostDto>> getMyPostPublished() {
        List<PostDto> list = postServiceImpl.getMyPostPublished();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/my-post/pending")
    public ResponseEntity<List<PostDto>> getMyPostPending() {
        List<PostDto> list = postServiceImpl.getAllMyPostPending();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/edit-post")
    public ResponseEntity editPost(@RequestBody PostDto postDto) throws IOException {
        if (!postServiceImpl.updatePost(postDto)) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
