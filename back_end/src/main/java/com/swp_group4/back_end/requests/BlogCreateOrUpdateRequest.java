package com.swp_group4.back_end.requests;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class BlogCreateOrUpdateRequest {
    String title;
    String content;
    String headerImageUrl;
    String imageUrl;
}
