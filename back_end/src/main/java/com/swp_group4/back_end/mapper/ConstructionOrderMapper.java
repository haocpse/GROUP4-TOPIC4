package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.responses.ConstructOrderResponse;
import com.swp_group4.back_end.responses.ConsultConstructResponse;
import com.swp_group4.back_end.responses.StateTransitionResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ConstructionOrderMapper {

    ConstructOrderResponse constructOrderResponse(ConstructionOrder constructionOrder, @MappingTarget ConstructOrderResponse response);

}
