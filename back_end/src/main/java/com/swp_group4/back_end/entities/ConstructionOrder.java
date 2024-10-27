package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    LocalDateTime startDate;
    Date constructionStartDate;
    Date constructionEndDate;
    String quotationId;
    String designId;
    String consultantId;
    String designerLeaderId;
    String constructorLeaderId;
    @Enumerated(EnumType.STRING)
    ConstructionOrderStatus status;

}
