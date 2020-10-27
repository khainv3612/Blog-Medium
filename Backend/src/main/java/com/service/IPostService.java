package com.service;

import com.dto.PostDto;
import com.dto.PostPendingDTO;
import com.model.Post;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.Instant;
import java.util.List;

@Service
public interface IPostService {
    List<PostDto> showAllPosts();

    Post findById(Long id);

    boolean createPost(PostDto postDto) throws IOException;

    PostDto readSinglePost(Long id);

    PostDto mapFromPostToDto(Post post);

    Post mapFromDtoToPost(PostDto postDto);

    void writeBlogPending(Post post) throws IOException;

    String readBlogContent(String urlPost);

    List<PostPendingDTO> getAllPostPending() throws FileNotFoundException;

    Long getNextIdPost();

    String convertLastUpdate(Instant lastUpdate);

    Integer publishPost(Long id);

    boolean deletePost(Long id);

    boolean movieFilePublish(String nameFile) throws IOException;

    List<Post> getMyPost();
}
