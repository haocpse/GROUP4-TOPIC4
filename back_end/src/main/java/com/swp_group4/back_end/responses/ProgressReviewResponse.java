package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProgressReviewResponse {

    String constructionOrderId;
    String customerName;
    Date startDate;
    Date endDate;
    String leaderName;
    ConstructionOrderStatus status;

}
