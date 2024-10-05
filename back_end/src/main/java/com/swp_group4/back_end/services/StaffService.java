package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.Account;
import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.Role;
import com.swp_group4.back_end.mapper.StaffMapper;
import com.swp_group4.back_end.repositories.AccountRepository;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.StaffRepository;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import com.swp_group4.back_end.responses.StaffResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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
    StaffMapper staffMapper;
    @Autowired
    @Lazy
    ManageConstructionOrderService manageConstructionOrderService;
    @Autowired
    @Lazy
    CustomerService customerService;

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
        ConstructionOrder order = manageConstructionOrderService.findConstructOrder(constructionOrderId);
        Customer customer = customerService.findCustomer(order.getCustomerId());
        ConstructOrderDetailForStaffResponse response = ConstructOrderDetailForStaffResponse.builder()
                .constructOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .customerRequest(order.getCustomerRequest())
                .build();
        if (!name.isEmpty()){
            response.setStaffName(name);
        }
        return response;
    }

    Staff identifyStaff() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        return staffRepository.findByAccountId(accountId)
                .orElseThrow(() -> new RuntimeException("Error"));
    }

    Staff findStaff(String staffId){
        return staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Error"));
    }

    String getStaffName(String staffId) {
        if (staffId != null && !staffId.isEmpty()) {
            return staffRepository.findById(staffId)
                    .orElseThrow(() -> new RuntimeException("Staff not found")).getStaffName();
        }
        return "";
    }

    List<StaffResponse> listStaffHasNoRole() {
        List<Staff> staffList = staffRepository.findByAccountIdIsNull();
        List<StaffResponse> responseList = new ArrayList<>();
        for (Staff staff : staffList) {
            StaffResponse response = new StaffResponse();
            staffMapper.toStaffResponse(staff, response);
            responseList.add(response);
        }
        return responseList;
    }

}