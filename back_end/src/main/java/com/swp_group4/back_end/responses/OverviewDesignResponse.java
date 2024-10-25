package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.DesignStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OverviewDesignResponse {

    String constructionOrderId;
    String designId;
    String customerName;
    LocalDateTime postedDate;
    DesignStatus designStatus;

}
