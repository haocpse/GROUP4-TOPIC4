package com.swp_group4.back_end.entities;

import com.swp_group4.back_end.enums.ConstructStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    ConstructStatus status;
    Date startDate;
    Date endDate;

}
