package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.ConstructOrderDetailForManagerResponse;
import com.swp_group4.back_end.responses.ConstructOrderResponse;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ConstructionOrderMapper {

    ConstructOrderResponse constructOrderResponse(ConstructionOrder constructionOrder, @MappingTarget ConstructOrderResponse response);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ConstructionOrder toConstructionOrder(StaffAssignedRequest request, @MappingTarget ConstructionOrder order);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "constructionOrderId", target = "orderId")
    @Mapping(source = "total", target = "totalPrice")
    ConstructOrderDetailForManagerResponse toDetailForManager(ConstructionOrder order, @MappingTarget ConstructOrderDetailForManagerResponse detail);

    ConstructionOrder toConstructionOrder(Design design, @MappingTarget ConstructionOrder order);


}
