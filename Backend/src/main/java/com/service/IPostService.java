package com.service;

import com.dto.PostDto;
import com.dto.PostPendingDTO;
import com.model.Post;
import com.model.Status;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Statement;
import java.time.Instant;
import java.util.List;

@Service
public interface IPostService {
    List<PostDto> showAllPosts();

    Post findById(Long id);

    boolean createPost(PostDto postDto) throws IOException;

    boolean updatePost(PostDto postDto) throws IOException;

    PostDto readSinglePost(Long id);

    PostDto mapFromPostToDto(Post post);

    Post mapFromDtoToPost(PostDto postDto, Status typePost);

    void writeBlog(Post post, String typePost) throws IOException;

    String readBlogContent(String urlPost);

    List<PostPendingDTO> getAllPostPending(int page, int size) throws FileNotFoundException;

    List<PostDto> getAllPostPublish(int page, int size) throws FileNotFoundException;

    Long getNextIdPost();

    String convertLastUpdate(Instant lastUpdate);

    Integer publishPost(Long id);

    boolean deletePost(Long id);

    boolean movieFilePublish(String nameFile, Long id) throws IOException;

    List<PostDto> getMyPostPublished(String username, int page, int size);

    List<PostDto> getAllMyPostPending(String username, int page, int size);

    Status getStatusById(Long id);

    Integer countPost(String postType);

    List<PostDto> getPostByUsername(String username, int page, int size);

}
