package com.swp_group4.back_end.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

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
    Date startDate;
    Date endDate;

}