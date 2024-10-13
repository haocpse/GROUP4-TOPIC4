package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.Gender;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String customerId;
    String firstname;
    String lastname;
    String phone;
    String address;
    String accountId;

}
