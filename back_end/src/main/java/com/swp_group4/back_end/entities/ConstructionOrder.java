package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ConstructionOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String constructionOrderId;
    String customerId;
    String customerRequest;
    double total;
    ZonedDateTime startDate;
    ZonedDateTime endDate;
    String quotationId;
    String designId;
    String consultant;
    String designLeader;
    String constructionLeader;
    @Enumerated(EnumType.STRING)
    ConstructionOrderStatus status;

}
