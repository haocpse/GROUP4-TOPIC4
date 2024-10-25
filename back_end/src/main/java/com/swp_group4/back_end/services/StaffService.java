package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.Account;
import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Customer;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.Role;
import com.swp_group4.back_end.repositories.AccountRepository;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.CustomerRepository;
import com.swp_group4.back_end.repositories.StaffRepository;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import com.swp_group4.back_end.responses.ImportantInfoOfOrderResponse;
import com.swp_group4.back_end.responses.StaffResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
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
    AccountService accountService;

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

    public List<ConstructOrderDetailForStaffResponse> getTasks(String accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        List<ConstructOrderDetailForStaffResponse> responses = new ArrayList<>();
        Staff staff = staffRepository.findByAccountId(accountId).orElseThrow(() -> new RuntimeException("Staff not found for account: " + accountId));
        List<ConstructionOrder> orders = new ArrayList<>();
        if (account.getRole().equals(Role.CONSULTANT)) {
            orders = constructOrderRepository.findByConsultantIdAndQuotationIdIsNull(staff.getStaffId());
        } else if (account.getRole().equals(Role.DESIGNER)) {
            orders = constructOrderRepository.findByDesignerLeaderIdAndDesignIdIsNull(staff.getStaffId());
        }
        for (ConstructionOrder order : orders) {
            ConstructOrderDetailForStaffResponse response = buildGeneralInfoTask(order.getConstructionOrderId());
            responses.add(response);
        }
        return responses;
    }

    private ConstructOrderDetailForStaffResponse buildGeneralInfoTask(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow(() -> new RuntimeException("Customer not found for order: " + constructionOrderId));
        return ConstructOrderDetailForStaffResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .status(order.getStatus())
                .build();
    }

    public ImportantInfoOfOrderResponse viewInfoCustomer(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(() -> new RuntimeException("ConstructionOrder not found for order: " + constructionOrderId));
        Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow();
        String accountId = accountService.getMyInfo().getAccountId();
        Staff staff = staffRepository.findByAccountId(accountId).orElseThrow(() -> new RuntimeException("Staff not found for account: " + accountId));
        return ImportantInfoOfOrderResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .staffName(staff.getStaffName())
                .customerRequest(order.getCustomerRequest())
                .address(customer.getAddress())
                .phone(customer.getPhone())
                .build();
    }

}