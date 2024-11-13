package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.*;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ConstructionOrderMapper {

    ConstructOrderResponse constructOrderResponse(ConstructionOrder constructionOrder, @MappingTarget ConstructOrderResponse response);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ConstructionOrder toConstructionOrder(StaffAssignedRequest request, @MappingTarget ConstructionOrder order);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "constructionOrderId", target = "orderId")
    @Mapping(source = "total", target = "totalPrice")
    @Mapping(source = "constructionEndDate", target = "endDate")
    ConstructOrderDetailForManagerResponse toDetailForManager(ConstructionOrder order, @MappingTarget ConstructOrderDetailForManagerResponse detail);

    @Mapping(source = "total", target = "totalPrice")
    @Mapping(source = "status", target = "constructionOrderStatus")
    ConstructQuotationResponse toConstructQuotationResponse(ConstructionOrder order, @MappingTarget ConstructQuotationResponse response);

    @Mapping(source = "constructionEndDate", target = "endDate")
    ConstructOrderDetailForCustomerResponse toDetailForCustomerResponse(ConstructionOrder order, @MappingTarget ConstructOrderDetailForCustomerResponse response);

    @Mapping(source = "constructionStartDate", target = "startDate")
    @Mapping(source = "constructionEndDate", target = "endDate")
    ProgressReviewResponse toProgressReviewResponse(ConstructionOrder order, @MappingTarget ProgressReviewResponse response);
}
