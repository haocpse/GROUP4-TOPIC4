package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ConstructOrderDetailForCustomerResponse {

    String constructionOrderId;
    String customerName;
    String quotationId;
    String designId;
    LocalDateTime startDate;
    Date endDate;
    ConstructionOrderStatus status;

}
