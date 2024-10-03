package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OverallReviewResponse<T> {

    String constructionOrderId;
    String id;
    String customerName;
    String phone;
    String address;
    T status;

}
