package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.ConstructionTasks;
import com.swp_group4.back_end.requests.DeadlineConstructionRequest;
import com.swp_group4.back_end.responses.ConstructTaskStatusResponse;
import com.swp_group4.back_end.responses.DeadlineConstructionResponse;
import com.swp_group4.back_end.responses.ListConstructProgressResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ConstructionTasksMapper {

    DeadlineConstructionResponse mapDeadlineConstructionResponse(ConstructionTasks deadlineConstructionRequest);
    ConstructTaskStatusResponse toConstructTaskStatusResponse(ConstructionTasks constructionTasks, @MappingTarget ConstructTaskStatusResponse constructTaskStatusResponse);
    ListConstructProgressResponse toListConstructProgressResponse(ConstructionTasks constructionTasks, @MappingTarget ListConstructProgressResponse listConstructProgressResponse);

}
