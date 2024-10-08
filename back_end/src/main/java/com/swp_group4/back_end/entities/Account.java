package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String accountId;
    String username;
    String password;
    @Enumerated(EnumType.STRING)
    Role role;

}
