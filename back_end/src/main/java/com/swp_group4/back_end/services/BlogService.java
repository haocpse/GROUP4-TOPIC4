package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.Blog;
import com.swp_group4.back_end.repositories.BlogRepository;
import com.swp_group4.back_end.requests.BlogCreateOrUpdateRequest;
import com.swp_group4.back_end.responses.BlogDetailResponse;
import com.swp_group4.back_end.responses.BlogResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class BlogService {
    @Autowired
    BlogRepository blogRepository;

    public Blog create(BlogCreateOrUpdateRequest request, MultipartFile headerImg, MultipartFile img) {
        Blog blog = Blog.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .dateCreated(LocalDateTime.now())
                .build();
        blog = blogRepository.save(blog);
        String blogId = blog.getBlogId().toString();
        String baseUrl = "http://localhost:8080/images/" + blogId + "/";
        if (headerImg != null && !headerImg.isEmpty()) {
            String headerImageFileName = saveImage(headerImg, blogId);
            blog.setHeaderImageUrl(baseUrl + headerImageFileName);
        }
        if (img != null && !img.isEmpty()) {
            String imageFileName = saveImage(img, blogId);
            blog.setImageUrl(baseUrl + imageFileName);
        }
        return blogRepository.save(blog);
    }

    public Blog update(String id, BlogCreateOrUpdateRequest request, MultipartFile headerImg, MultipartFile img) {
        Blog blog = blogRepository.findById(id).orElseThrow();
        if (request.getTitle() != null) {
            blog.setTitle(request.getTitle());
        }
        if (request.getContent() != null) {
            blog.setContent(request.getContent());
        }
        String baseUrl = "http://localhost:8080/images/" + id + "/";
        if (headerImg != null && !headerImg.isEmpty()) {
            String headerImageFileName = saveImage(headerImg, id);
            blog.setHeaderImageUrl(baseUrl + headerImageFileName);
        }
        if (img != null && !img.isEmpty()) {
            String imageFileName = saveImage(img, id);
            blog.setImageUrl(baseUrl + imageFileName);
        }
        return blogRepository.save(blog);
    }


    public BlogResponse getAllBlog() {
        List<Blog> blogs = blogRepository.findAll();
        return BlogResponse.builder()
                .blogList(blogs)
                .build();
    }

    public BlogDetailResponse getBlogDetail(String id) {
        Blog blog = blogRepository.findById(id).orElseThrow();
        return BlogDetailResponse.builder()
                .title(blog.getTitle())
                .content(blog.getContent())
                .imageUrl(blog.getImageUrl())
                .headerImageUrl(blog.getHeaderImageUrl())
                .date(blog.getDateCreated())
                .build();
    }

    private String saveImage(MultipartFile file, String blogId){
        try{
            String UPLOAD_DIR = "image/" + blogId + "/";
            String fileName = Objects.requireNonNull(file.getOriginalFilename()).replace(" ", "_");
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
            return fileName;
        }catch (IOException e) {
            log.error("Error saving image", e);
            throw new RuntimeException("Error saving image", e);
        }
    }

    public Blog delete(String blogId) {
        Blog blog = blogRepository.findById(blogId).orElseThrow();
        return blogRepository.save(blog);
    }
}

