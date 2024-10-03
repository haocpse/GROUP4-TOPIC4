package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.DesignStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    DesignStatus status;

}
