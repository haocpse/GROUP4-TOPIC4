package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.UpdateInfoRequest;
import com.swp_group4.back_end.responses.CustomerResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.v20240919-1711, environment: Java 17.0.12 (Eclipse Adoptium)"
)
@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public Customer serviceRequestToCustomer(ServiceRequest request, Customer customer) {
        if ( request == null ) {
            return customer;
        }

        customer.setAddress( request.getAddress() );
        customer.setFirstname( request.getFirstname() );
        customer.setLastname( request.getLastname() );
        customer.setPhone( request.getPhone() );

        return customer;
    }

    @Override
    public Customer updateInfoToCustomer(UpdateInfoRequest request, Customer customer) {
        if ( request == null ) {
            return customer;
        }

        customer.setAddress( request.getAddress() );
        customer.setBirthday( request.getBirthday() );
        customer.setFirstname( request.getFirstname() );
        customer.setGender( request.getGender() );
        customer.setLastname( request.getLastname() );
        customer.setPhone( request.getPhone() );

        return customer;
    }

    @Override
    public CustomerResponse customerToResponse(Customer customer, CustomerResponse customerResponse) {
        if ( customer == null ) {
            return customerResponse;
        }

        customerResponse.setAddress( customer.getAddress() );
        customerResponse.setBirthday( customer.getBirthday() );
        customerResponse.setFirstname( customer.getFirstname() );
        customerResponse.setGender( customer.getGender() );
        customerResponse.setLastname( customer.getLastname() );
        customerResponse.setPhone( customer.getPhone() );

        return customerResponse;
    }
}
