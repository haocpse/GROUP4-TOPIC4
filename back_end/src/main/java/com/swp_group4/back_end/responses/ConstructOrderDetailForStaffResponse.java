package com.swp_group4.back_end.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ConstructOrderDetailForStaffResponse {

    String constructOrderId;
    String customerName;
    String staffName;
    String phone;
    String address;
    String customerRequest;

}
