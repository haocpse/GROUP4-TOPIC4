package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.MaintenanceOrder;
import com.swp_group4.back_end.mapper.CustomerMapper;
import com.swp_group4.back_end.mapper.MaintenanceOrderMapper;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.MaintenanceOrderRepository;
import com.swp_group4.back_end.requests.MaintenanceStaffAssignedRequest;
import com.swp_group4.back_end.responses.MaintenanceOrderDetailForManagerResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaintenanceOrderService {
    @Autowired
    MaintenanceOrderRepository maintenanceOrderRepository;
    @Autowired
    MaintenanceOrderMapper maintenanceOrderMapper;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    CustomerRepository customerRepository;

    public MaintenanceOrder addTotal(String orderId, double total){
        MaintenanceOrder order = maintenanceOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setTotal(total);
        return maintenanceOrderRepository.save(order);
    }

    public List<MaintenanceOrderDetailForManagerResponse> listAllOrder(){
        List<MaintenanceOrderDetailForManagerResponse> responses = new ArrayList<>();
        List<MaintenanceOrder> maintenanceOrders = maintenanceOrderRepository.findAll();
        for(MaintenanceOrder maintenanceOrder : maintenanceOrders){
            Customer customer = this.findCustomerById(maintenanceOrder.getCustomerId());
            MaintenanceOrderDetailForManagerResponse response = this.buildMaintenanceOrderDetailForManagerResponse(maintenanceOrder, customer);
            responses.add(response);
        }
        return responses;
    }

    public MaintenanceOrderDetailForManagerResponse assignLeader(MaintenanceStaffAssignedRequest request){
        MaintenanceOrder order = this.findMaintenanceOrder(request.getMaintenanceOrderId());
        Customer customer = this.findCustomerById(order.getCustomerId());
        log.info(request.getConstructorLeaderId());
        maintenanceOrderRepository.save(maintenanceOrderMapper.toMaintenanceOrder(request, order));
        log.info(order.toString());
        return this.buildMaintenanceOrderDetailForManagerResponse(order, customer);
    }

    MaintenanceOrderDetailForManagerResponse buildMaintenanceOrderDetailForManagerResponse(MaintenanceOrder order, Customer customer) {
        MaintenanceOrderDetailForManagerResponse response = MaintenanceOrderDetailForManagerResponse.builder()
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .constructorLeaderId(order.getConstructorLeaderId())
                .build();
        maintenanceOrderMapper.toMaintenanceOrderDetailForManager(order, response);
        customerMapper.toMaintenanceDetailForManager(customer, response);
        return response;
    }

    MaintenanceOrder findMaintenanceOrder(String maintenanceOrderId) {
        return maintenanceOrderRepository.findById(maintenanceOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    Customer findCustomerById(String customerId){
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
}
