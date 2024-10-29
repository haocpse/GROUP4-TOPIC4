package com.swp_group4.back_end.controllers;

import com.swp_group4.back_end.entities.Blog;
import com.swp_group4.back_end.requests.BlogCreateOrUpdateRequest;
import com.swp_group4.back_end.responses.ApiResponse;
import com.swp_group4.back_end.responses.BlogDetailResponse;
import com.swp_group4.back_end.responses.BlogResponse;
import com.swp_group4.back_end.services.BlogService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j

public class BlogController {
    @Autowired
    BlogService blogService;

    @PutMapping("/blog/{blogId}")
    public ApiResponse<Blog> updateBlog(@PathVariable String blogId, @RequestBody BlogCreateOrUpdateRequest request) {
        return ApiResponse.<Blog>builder()
                .data(blogService.update(blogId, request))
                .build();
    }

    @DeleteMapping("/{blogId}")
    public ApiResponse<Blog> deleteBlog(@PathVariable String blogId) {
        return ApiResponse.<Blog>builder()
                .data(blogService.delete(blogId))
                .build();
    }

    @PostMapping("/blog/create")
    public ApiResponse<Blog> createBlog(@RequestBody BlogCreateOrUpdateRequest request) {
        return ApiResponse.<Blog>builder()
                .data(blogService.create(request))
                .build();
    }

    @GetMapping("/blog")
    public ApiResponse<BlogResponse> getAllBlogs() {
        return ApiResponse.<BlogResponse>builder()
                .data(blogService.getAllBlog())
                .build();
    }

    @GetMapping("/{blogId}")
    public ApiResponse<BlogDetailResponse> getBlog(@PathVariable String blogId) {
        return ApiResponse.<BlogDetailResponse>builder()
                .data(blogService.getBlogDetail(blogId))
                .build();
    }

}
