package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.UpdateInfoRequest;
import com.swp_group4.back_end.responses.ConstructOrderDetailForManagerResponse;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import com.swp_group4.back_end.responses.CustomerResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    Customer serviceRequestToCustomer(ServiceRequest request, @MappingTarget Customer customer);
    Customer updateInfoToCustomer(UpdateInfoRequest request, @MappingTarget Customer customer);
    CustomerResponse customerToResponse(Customer customer, @MappingTarget CustomerResponse customerResponse);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ConstructOrderDetailForManagerResponse toDetailForManager(Customer customer, @MappingTarget ConstructOrderDetailForManagerResponse detail);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ConstructOrderDetailForStaffResponse toDetailForStaff(Customer customer, @MappingTarget ConstructOrderDetailForStaffResponse detail);

}
