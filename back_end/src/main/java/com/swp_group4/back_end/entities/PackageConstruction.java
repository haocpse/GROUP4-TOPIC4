package com.swp_group4.back_end.entities;

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
public class PackageConstruction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String packageConstructionId;
    String packageId;
    String content;
    double price;
}
