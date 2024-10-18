package com.swp_group4.back_end.requests;

import com.swp_group4.back_end.enums.MaintenanceOrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class MaintenanceStaffAssignedRequest {
    String maintenanceOrderId;
    String constructorLeader;
    MaintenanceOrderStatus status;
}

