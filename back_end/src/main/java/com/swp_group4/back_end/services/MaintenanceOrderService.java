package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.MaintenanceOrder;
import com.swp_group4.back_end.enums.MaintenanceOrderStatus;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.MaintenanceOrderRepository;
import com.swp_group4.back_end.repositories.StaffRepository;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaintenanceOrderService {
    @Autowired
    MaintenanceOrderRepository maintenanceOrderRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    CustomerRepository customerRepository;

    public MaintenanceOrder createOrder(Service request, Customer customer) {
        MaintenanceOrder maintenanceOrder = MaintenanceOrder.builder()
                .customerId(customer.getCustomerId())
                .startDate(ZonedDateTime.now())
                .status(MaintenanceOrderStatus.REQUESTED)
                .build();
        return maintenanceOrderRepository.save(maintenanceOrder);
    }


}
