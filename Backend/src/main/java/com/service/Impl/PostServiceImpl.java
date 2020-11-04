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
        Post post = mapFromDtoToPost(postDto, sttPending);
        if (postRepository.getNextId() != null) {
            post.setId(getNextIdPost() + 1L);
        } else {
            post.setId(1L);
        }
        writeBlog(post, environment.getProperty("URL_POST_PENDING"));
        postRepository.save(post);
        return true;
    }

    @Override
    public boolean updatePost(PostDto postDto) throws IOException {
        if (!postDto.getImage().startsWith("https://firebasestorage.googleapis.com/"))
            return false;
        Status status = getStatusById(postDto.getId());
        Post post = mapFromDtoToPost(postDto, status);
        if (status.getIdStatus().equals(sttPending.getIdStatus())){
            writeBlog(post, environment.getProperty("URL_POST_PENDING"));
        } else if (status.getIdStatus().equals(sttPublished.getIdStatus())){
            writeBlog(post, environment.getProperty("URL_POST_PUBLISHED"));
        }
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
        postDto.setAvatarAuthor(post.getAccountCreate().getImage());
        return postDto;
    }

    @Override
    public Post mapFromDtoToPost(PostDto postDto, Status typePost) {
        Post post = new Post();
        if (postDto.getId() != null)
            post.setId(postDto.getId());
        post.setTitle(postDto.getTitle());
        post.setImage(postDto.getImage());
        post.setContent(postDto.getContent());
        post.setLastUpdate(Instant.now());
        post.setUserCreate(accountServiceImpl.findByUsername(postDto.getUsername()));
        post.setStatus(typePost);
        return post;
    }

    @Override
    public void writeBlog(Post post, String typePost) throws IOException {
        FileWriter writer = null;
        BufferedWriter buffer = null;
        Date myDate = Date.from(post.getLastUpdate());
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = formatter.format(myDate);
        String fileName = "id-" + post.getId() + "_" +
                post.getUserCreate().getUserName().replaceAll("\\s", "-") + "_" + formattedDate + ".txt";
        String postUrl = typePost + fileName;
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
        post.setContent(postUrl);
        System.out.println("Success... write " + fileName);
    }

    @Override
    public String readBlogContent(String urlPost) {
        StringBuilder content = new StringBuilder();
        try {
            FileReader fr = new FileReader(urlPost);
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
                pendingDTO.setAvatarAuthor(p.getUserCreate().getImage());
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
        if (!movieFilePublish(findById(id).getContent(), id))
            result = 0;
        return result;
    }

    @Override
    @Transactional
    public boolean deletePost(Long id) {
        try {
            Query query = entityManager.createNamedQuery("Post.getUrlContentById");
            String content = query.setParameter("id", id).getResultList().get(0).toString();
            File file = new File(content);
            postRepository.deleteById(id);
            file.delete();
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean movieFilePublish(String nameFile, Long id) {
        String newUrl = "";
        try {
            File postFile = new File(nameFile);
            newUrl = environment.getProperty("URL_POST_PUBLISHED")
                    + nameFile.substring(31);
            //            if change url, must change substring method in PostServiceImpl in method  movieFilePublish
            if (!postFile.renameTo(new File(newUrl))) {
                return false;
            }
            Post post = findById(id);
            post.setContent(newUrl);
            postRepository.save(post);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return true;
    }

    @Override
    public List<PostDto> getMyPostPublished() {
        List<Post> list =
                postRepository.getAllByAccountCreate_IdAndStatusEqualsOrderByIdDesc(accountServiceImpl.findByUsername(getCurrentUser().getUsername()).getId(), sttPublished);
        return list.stream().map(this::mapFromPostToDto).collect(toList());
    }

    @Override
    public List<PostDto> getAllMyPostPending() {
        List<Post> list =
                postRepository.getAllByAccountCreate_IdAndStatusEqualsOrderByIdDesc(accountServiceImpl.findByUsername(getCurrentUser().getUsername()).getId(), sttPending);
        return list.stream().map(this::mapFromPostToDto).collect(toList());
    }

    @Override
    @Transactional
    public Status getStatusById(Long id) {
        Query query = entityManager.createNamedQuery("Post.getStatusById");
        query.setParameter("id", id);
        Status status = (Status) query.getResultList().get(0);
        return status;
    }

    public User getCurrentUser() {
        User loggedInUser = authService.getCurrentUser().orElseThrow(() -> new IllegalArgumentException("User Not Found"));
        return loggedInUser;
    }
}
