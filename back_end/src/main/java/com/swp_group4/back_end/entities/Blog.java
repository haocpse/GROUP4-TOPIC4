package com.swp_group4.back_end.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String blogId;
    String title;
    String author;
    String content;
    String headerImageUrl;
    String imageUrl;
    LocalDateTime dateCreated;
}
