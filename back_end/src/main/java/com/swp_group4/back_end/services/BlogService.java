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

import java.time.LocalDateTime;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class BlogService {
    @Autowired
    BlogRepository blogRepository;

    public Blog create(BlogCreateOrUpdateRequest request) {
        Blog blog = Blog.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(request.getAuthor())
                .imageUrl(request.getImageUrl())
                .headerImageUrl(request.getHeaderImageUrl())
                .dateCreated(LocalDateTime.now())
                .build();
        return blogRepository.save(blog);
    }

    public Blog update(String id, BlogCreateOrUpdateRequest request) {
        Blog blog = blogRepository.findById(id).orElseThrow();
        if (request.getTitle() != null) {
            blog.setTitle(request.getTitle());
        }
        if (request.getContent() != null) {
            blog.setContent(request.getContent());
        }
        if (request.getAuthor() != null) {
            blog.setAuthor(request.getAuthor());
        }
        if (request.getImageUrl() != null) {
            blog.setImageUrl(request.getImageUrl());
        }
        if (request.getHeaderImageUrl() != null) {
            blog.setHeaderImageUrl(request.getHeaderImageUrl());
        }
        return blogRepository.save(blog);
    }

    public Blog delete(String id){
        blogRepository.deleteById(id);
        return null;
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
                .author(blog.getAuthor())
                .title(blog.getTitle())
                .content(blog.getContent())
                .imageUrl(blog.getImageUrl())
                .headerImageUrl(blog.getHeaderImageUrl())
                .build();
    }
}
