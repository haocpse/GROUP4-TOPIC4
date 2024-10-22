package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.enums.QuotationStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    Date postedDate;
    DesignStatus designStatus;

}
