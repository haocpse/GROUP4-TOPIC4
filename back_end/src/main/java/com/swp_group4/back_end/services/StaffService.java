package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.Account;
import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.Role;
import com.swp_group4.back_end.mapper.CustomerMapper;
import com.swp_group4.back_end.repositories.AccountRepository;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.StaffRepository;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import com.swp_group4.back_end.responses.StaffResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffService {

    @Autowired
    StaffRepository staffRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    CustomerMapper customerMapper;

    public List<StaffResponse> listAllStaff(String staff) {
        List<Account> staffAccounts;
        if (staff.equals("consultant")) {
            staffAccounts = accountRepository.findByRole(Role.CONSULTANT);
        } else if (staff.equals("designer")) {
            staffAccounts = accountRepository.findByRole(Role.DESIGNER);
        } else {
            staffAccounts = accountRepository.findByRole(Role.CONSTRUCTOR);
        }
        return staffAccounts.stream()
                .map(account -> staffRepository.findByAccountId(account.getAccountId())
                        .map(staffs -> new StaffResponse(staffs.getStaffId(), staffs.getStaffName()))
                        .orElseThrow(() -> new RuntimeException("Staff not found for account: " + account.getAccountId())))
                .toList();
    }

    public List<ConstructOrderDetailForStaffResponse> listOwnedStaffTask() {
        List<ConstructOrderDetailForStaffResponse> responses = new ArrayList<>();
        Staff staff = this.identifyStaff();
        if (accountRepository.findById(staff.getAccountId())
                .orElseThrow().getRole().equals(Role.CONSULTANT)) {
            List<ConstructionOrder> orders = constructOrderRepository.findByConsultant(staff.getStaffId());
            for (ConstructionOrder order : orders) {
                ConstructOrderDetailForStaffResponse response = this.detailOfOrder(order.getConstructionOrderId(), "");
                response.setStaffName(staff.getStaffName());
                responses.add(response);
            }
        } else if (accountRepository.findById(staff.getAccountId())
                .orElseThrow().getRole().equals(Role.DESIGNER)) {
            List<ConstructionOrder> orders = constructOrderRepository.findByDesignLeader(staff.getStaffId());
            for (ConstructionOrder order : orders) {
                ConstructOrderDetailForStaffResponse response = this.detailOfOrder(order.getConstructionOrderId(), "");
                response.setStaffName(staff.getStaffName());
                responses.add(response);
            }
        } else {
            List<ConstructionOrder> orders = constructOrderRepository.findByConstructionLeader(staff.getStaffId());
            for (ConstructionOrder order : orders) {
                ConstructOrderDetailForStaffResponse response = this.detailOfOrder(order.getConstructionOrderId(), "");
                response.setStaffName(staff.getStaffName());
                responses.add(response);
            }
        }
        return responses;
    }

    public ConstructOrderDetailForStaffResponse detailOfOrder(String constructionOrderId, String name) {
        ConstructOrderDetailForStaffResponse response = new ConstructOrderDetailForStaffResponse();
        if (!name.isEmpty()){
            response.setStaffName(name);
        }
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found for id: " + constructionOrderId));
        Customer customer = customerRepository.findById(order.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Error"));
        response.setConstructOrderId(order.getConstructionOrderId());
        response.setCustomerName(customer.getFirstname() + " " + customer.getLastname());
        response.setPhone(customer.getPhone());
        response.setAddress(customer.getAddress());
        response.setCustomerRequest(order.getCustomerRequest());
        return response;
    }

    Staff identifyStaff() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        return staffRepository.findByAccountId(accountId)
                .orElseThrow(() -> new RuntimeException("Error"));
    }

}