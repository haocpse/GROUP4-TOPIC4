package com.swp_group4.back_end.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class BlogDetailResponse {
    String title;
    String author;
    String content;
    String headerImageUrl;
    String imageUrl;
}
