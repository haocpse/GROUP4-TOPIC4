package com.swp_group4.back_end.requests;

import com.swp_group4.back_end.enums.Service;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.ZonedDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ServiceRequest {

    @Enumerated(EnumType.STRING)
    Service service;
    String firstname;
    String lastname;
    String phone;
    String address;
    String customerRequest;

}
