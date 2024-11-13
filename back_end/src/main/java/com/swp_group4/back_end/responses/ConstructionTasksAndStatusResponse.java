package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.entities.Staff;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ConstructionTasksAndStatusResponse {

    String constructionOrderId;
    String customerName;
    List<Staff> staffs;
    List<ConstructTaskStatusResponse> constructTaskStatusResponses;

}
