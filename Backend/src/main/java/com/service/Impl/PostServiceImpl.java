package com.service.Impl;

import com.dto.PostDto;
import com.dto.PostPendingDTO;
import com.exception.PostNotFoundException;
import com.model.Post;
import com.model.Status;
import com.repository.PostRepository;
import com.service.AuthService;
import com.service.IAccountService;
import com.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.*;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Service
public class PostServiceImpl implements IPostService {

    @Autowired
    private AuthService authService;
    @Autowired
    private IAccountService accountServiceImpl;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private Status sttPending;
    @Autowired
    private Status sttDelete;
    @Autowired
    private Status sttPublished;
    @Autowired
    private Environment environment;
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<PostDto> showAllPosts() {
        List<Post> posts = postRepository.findAllByStatusEqualsOrderByIdDesc(sttPublished);
        return posts.stream().map(this::mapFromPostToDto).collect(toList());
    }

    @Override
    public Post findById(Long id) {
        Post post = postRepository.findById(id).get();
        return post;
    }

    @Override
    public boolean createPost(PostDto postDto) throws IOException {
        if (!postDto.getImage().startsWith("https://firebasestorage.googleapis.com/"))
            return false;
        Post post = mapFromDtoToPost(postDto);
        if (postRepository.getNextId() != null) {
            post.setId(getNextIdPost() + 1L);
        } else {
            post.setId(1L);
        }
        writeBlogPending(post);
        postRepository.save(post);
        return true;
    }

    @Override
    public PostDto readSinglePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("For id " + id));
        return mapFromPostToDto(post);
    }

    @Override
    public PostDto mapFromPostToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setImage(post.getImage());
        postDto.setContent(readBlogContent(post.getContent()));
        postDto.setUsername(post.getUserCreate().getUserName());
        postDto.setLastUpdate(convertLastUpdate(post.getLastUpdate()));
        return postDto;
    }

    @Override
    public Post mapFromDtoToPost(PostDto postDto) {
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setImage(postDto.getImage());
        post.setContent(postDto.getContent());
        User loggedInUser = authService.getCurrentUser().orElseThrow(() -> new IllegalArgumentException("User Not Found"));
        post.setLastUpdate(Instant.now());
        post.setUserCreate(accountServiceImpl.findByUsername(loggedInUser.getUsername()));
        post.setStatus(sttPending);
        return post;
    }

    @Override
    public void writeBlogPending(Post post) throws IOException {
        FileWriter writer = null;
        BufferedWriter buffer = null;
        Date myDate = Date.from(post.getLastUpdate());
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = formatter.format(myDate);
        String fileName = "id-" + post.getId() + "_" +
                post.getUserCreate().getUserName().replaceAll("\\s", "-") + "_" + formattedDate + ".txt";
        String postUrl = environment.getProperty("URL_POST_PENDING")
                + fileName;
        try {
            writer = new FileWriter(postUrl);
            buffer = new BufferedWriter(writer);
            buffer.write(post.getContent());
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Failed... write " + fileName);
        } finally {
            buffer.close();
        }
        post.setContent(fileName);
        System.out.println("Success... write " + fileName);
    }

    @Override
    public String readBlogContent(String urlPost) {
        StringBuilder content = new StringBuilder();
        try {
            FileReader fr = new FileReader(environment.getProperty("URL_POST_PENDING") + urlPost);
            BufferedReader read = new BufferedReader(fr);
            String i;
            while ((i = read.readLine()) != null)
                content.append(i);
            read.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return content.toString();
    }

    @Override
    public List<PostPendingDTO> getAllPostPending() throws FileNotFoundException {
        List<Post> lstPostPending = postRepository.findAllByStatusEqualsOrderByIdDesc(sttPending);
        List<PostPendingDTO> lstPending = new ArrayList<>();
        SimpleDateFormat formatter = new SimpleDateFormat("dd MM yyyy HH:mm:ss");
        if (lstPostPending != null && !lstPostPending.isEmpty()) {
            for (Post p : lstPostPending) {
                PostPendingDTO pendingDTO = new PostPendingDTO();
                pendingDTO.setIdPending(p.getId());
                pendingDTO.setContent(readBlogContent(p.getContent()));
                pendingDTO.setImage(p.getImage());
                pendingDTO.setTitle(p.getTitle());
                Date update = Date.from(p.getLastUpdate());
                pendingDTO.setLastUpdate(formatter.format(update));
                pendingDTO.setUserCreate(p.getUserCreate().getUserName());
                lstPending.add(pendingDTO);
            }
        }
        return lstPending.stream().collect(toList());
    }

    @Override
    public Long getNextIdPost() {

        Long id = (Long) postRepository.getNextId();
        return id;
    }

    @Override
    public String convertLastUpdate(Instant lastUpdate) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
        Date update = Date.from(lastUpdate);
        return formatter.format(update);
    }

    @Override
    @Transactional
    public Integer publishPost(Long id) {
        Query query = entityManager.createNamedQuery("Post.publishPost");
        query.setParameter("id", id);
        int result = query.executeUpdate();
        if (!movieFilePublish(findById(id).getContent()))
            result = 0;
        return result;
    }

    @Override
    @Transactional
    public boolean deletePost(Long id) {
        try {
            Query query = entityManager.createNamedQuery("Post.getUrlContentById");
            String content = query.setParameter("id", id).getResultList().get(0).toString();
            File file = new File(environment.getProperty("URL_POST_PENDING") + content);
            postRepository.deleteById(id);
            file.delete();
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean movieFilePublish(String nameFile) {
        try {
            File post = new File(environment.getProperty("URL_POST_PENDING") + nameFile);
            if (!post.renameTo(new File(environment.getProperty("URL_POST_PUBLISHED") + nameFile))) {
                return false;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return true;
    }

    @Override
    public List<Post> getMyPost() {
        User loggedInUser = authService.getCurrentUser().orElseThrow(() -> new IllegalArgumentException("User Not Found"));
        List<Post> list =
                postRepository.getAllByAccountCreate_Id(accountServiceImpl.findByUsername(loggedInUser.getUsername()).getId());
        return list;
    }
}
