package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.entities.ConstructionTasks;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CompleteConstructTaskResponse {

    List<ConstructionTasks> completeList;

}
