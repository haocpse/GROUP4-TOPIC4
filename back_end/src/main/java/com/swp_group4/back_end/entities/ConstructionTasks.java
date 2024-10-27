package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.ConstructStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ConstructionTasks {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String taskId;
    String constructionOrderId;
    String packageConstructionId;
    @Enumerated(EnumType.STRING)
    ConstructStatus status;
    Date startDate;
    Date endDate;

}
