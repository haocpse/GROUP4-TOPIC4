package com.swp_group4.back_end.responses;


import com.swp_group4.back_end.enums.Service;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ServiceResponse<T> {

    @Enumerated(EnumType.STRING)
    Service service;
    T data;

}
