package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.DesignStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Design {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String designId;
    String url2dDesign;
    String url3dDesign;
    String urlFrontDesign;
    String urlBackDesign;
    @Enumerated(EnumType.STRING)
    DesignStatus designStatus;
    LocalDateTime postedDate;

}
