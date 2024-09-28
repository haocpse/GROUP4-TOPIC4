package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.UpdateInfoRequest;
import com.swp_group4.back_end.responses.CustomerResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Amazon.com Inc.)"
)
@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public Customer serviceRequestToCustomer(ServiceRequest request, Customer customer) {
        if ( request == null ) {
            return customer;
        }

        customer.setFirstname( request.getFirstname() );
        customer.setLastname( request.getLastname() );
        customer.setPhone( request.getPhone() );
        customer.setAddress( request.getAddress() );

        return customer;
    }

    @Override
    public Customer updateInfoToCustomer(UpdateInfoRequest request, Customer customer) {
        if ( request == null ) {
            return customer;
        }

        customer.setFirstname( request.getFirstname() );
        customer.setLastname( request.getLastname() );
        customer.setPhone( request.getPhone() );
        customer.setAddress( request.getAddress() );
        customer.setGender( request.getGender() );
        customer.setBirthday( request.getBirthday() );

        return customer;
    }

    @Override
    public CustomerResponse customerToResponse(Customer customer, CustomerResponse customerResponse) {
        if ( customer == null ) {
            return customerResponse;
        }

        customerResponse.setFirstname( customer.getFirstname() );
        customerResponse.setLastname( customer.getLastname() );
        customerResponse.setPhone( customer.getPhone() );
        customerResponse.setAddress( customer.getAddress() );
        customerResponse.setGender( customer.getGender() );
        customerResponse.setBirthday( customer.getBirthday() );

        return customerResponse;
    }
}
