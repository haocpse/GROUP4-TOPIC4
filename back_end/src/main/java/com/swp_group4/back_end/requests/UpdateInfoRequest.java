package com.swp_group4.back_end.requests;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UpdateInfoRequest {

    String firstname;
    String lastname;
    String phone;
    String address;
    Date birthday;

}
