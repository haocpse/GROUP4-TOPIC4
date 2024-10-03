package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ConstructOrderStatusTransitionResponse<T> {

    String orderId;
    String customerName;
    String phone;
    String address;
    String consultant;
    String designLeader;
    String constructorLeader;
    ConstructionOrderStatus orderStatus;
    T status;

}
