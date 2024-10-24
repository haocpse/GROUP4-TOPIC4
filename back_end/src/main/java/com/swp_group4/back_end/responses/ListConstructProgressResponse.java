package com.swp_group4.back_end.responses;

import com.swp_group4.back_end.enums.ConstructStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ListConstructProgressResponse {

    String packageConstructionId;
    String taskId;
    String content;
    String staffName;
    ConstructStatus status;


}
