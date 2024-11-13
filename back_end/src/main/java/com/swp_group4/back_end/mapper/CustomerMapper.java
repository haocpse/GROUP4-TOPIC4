package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.UpdateInfoRequest;
import com.swp_group4.back_end.responses.AllCustomerInfoResponse;
import com.swp_group4.back_end.responses.ConstructOrderDetailForManagerResponse;
import com.swp_group4.back_end.responses.CustomerResponse;
import com.swp_group4.back_end.responses.MaintenanceOrderDetailForManagerResponse;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    Customer serviceRequestToCustomer(ServiceRequest request, @MappingTarget Customer customer);
    Customer updateInfoToCustomer(UpdateInfoRequest request, @MappingTarget Customer customer);

    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    CustomerResponse customerToResponse(Customer customer, @MappingTarget CustomerResponse customerResponse);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ConstructOrderDetailForManagerResponse toDetailForManager(Customer customer, @MappingTarget ConstructOrderDetailForManagerResponse detail);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    MaintenanceOrderDetailForManagerResponse toMaintenanceDetailForManager(Customer customer, @MappingTarget MaintenanceOrderDetailForManagerResponse detail);

    AllCustomerInfoResponse toAllCustomerInfoResponse(Customer customer, @MappingTarget AllCustomerInfoResponse customerResponse);
}
