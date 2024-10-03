package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.ConstructOrderResponse;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ConstructionOrderMapper {

    ConstructOrderResponse constructOrderResponse(ConstructionOrder constructionOrder, @MappingTarget ConstructOrderResponse response);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ConstructionOrder toConstructionOrder(StaffAssignedRequest request, @MappingTarget ConstructionOrder order);

}
