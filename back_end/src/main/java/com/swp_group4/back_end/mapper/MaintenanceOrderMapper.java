package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.MaintenanceOrder;
import com.swp_group4.back_end.requests.MaintenanceStaffAssignedRequest;
import com.swp_group4.back_end.responses.MaintenanceOrderDetailForManagerResponse;
import com.swp_group4.back_end.responses.MaintenanceOrderResponse;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.*;

@Mapper(componentModel = "spring")

public interface MaintenanceOrderMapper {
    MaintenanceOrderResponse maintenanceOrderResponse(MaintenanceOrder maintenanceOrder, @MappingTarget MaintenanceOrderResponse response);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    MaintenanceOrder toMaintenanceOrder(MaintenanceStaffAssignedRequest request, @MappingTarget MaintenanceOrder order);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "maintenanceOrderId", target = "orderId")
    @Mapping(source = "total", target = "totalPrice")
    MaintenanceOrderDetailForManagerResponse toMaintenanceOrderDetailForManager(MaintenanceOrder order, @MappingTarget MaintenanceOrderDetailForManagerResponse detail);
}
