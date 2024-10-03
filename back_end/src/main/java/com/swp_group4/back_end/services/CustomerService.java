package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.mapper.CustomerMapper;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.requests.UpdateInfoRequest;
import com.swp_group4.back_end.responses.CustomerResponse;
import com.swp_group4.back_end.responses.ServiceResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    ManageConstructionOrderService manageConstructionOrderService;

    public void createCustomer(String accountId, String firstname) {
        customerRepository.save(Customer.builder()
                .accountId(accountId)
                .firstname(firstname)
                .build());
    }

    public CustomerResponse getOwnedInfo(){
        Customer customer = this.identifyCustomer();
        CustomerResponse response = new CustomerResponse();
        return customerMapper.customerToResponse(customer, response);
    }

    public CustomerResponse updateOwnedInfo(UpdateInfoRequest request) {
        Customer customer = this.identifyCustomer();
        customerMapper.updateInfoToCustomer(request, customer);
        customerRepository.save(customer);
        CustomerResponse response = new CustomerResponse();
        return customerMapper.customerToResponse(customer, response);
    }

    public ServiceResponse<?> contactUs(ServiceRequest serviceRequest) {
        Customer customer = this.identifyCustomer();
        customerMapper.serviceRequestToCustomer(serviceRequest, customer);
        customerRepository.save(customer);
        if (serviceRequest.getService().name().equals("CONSTRUCTION_SERVICE")) {
            ConstructionOrder constructionOrder = manageConstructionOrderService.createOrder(serviceRequest, customer);
            return manageConstructionOrderService.contactUsForConstruction(serviceRequest, constructionOrder);
        }
//        if (serviceRequest.getService().name().equals("MAINTENANCE_SERVICE")) {
//          return contactUsForMaintenance(serviceRequest);
//        }
       return null;
    }

    Customer identifyCustomer() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        return customerRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Customer not found"));
    }

}
