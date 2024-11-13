package com.swp_group4.back_end.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class AllCustomerInfoResponse {

    String firstName;
    String lastName;
    String phone;
    long point;
    String address;
    String avatarURL;
}
