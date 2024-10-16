package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.*;
import com.swp_group4.back_end.mapper.StaffMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.*;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConstructionService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    StaffMapper staffMapper;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ConstructionTaskStaffRepository constructionTaskStaffRepository;

    public List<ConstructOrderDetailForStaffResponse> listOwnedConstructTask() {
        List<ConstructOrderDetailForStaffResponse> responses = new ArrayList<>();
        String staffId = "bc690fff-8729-11ef-bf00-c85acfa9b517";
        Staff staff = staffRepository.findById(staffId).orElseThrow();
//        Staff staff = this.identifyStaff();
        List<ConstructionOrder> orders = constructOrderRepository.findByConstructorLeaderId(staffId);
        for (ConstructionOrder order : orders) {
            ConstructOrderDetailForStaffResponse response = this.detailOfOrder(order.getConstructionOrderId());
            response.setStaffName(staff.getStaffName());
            responses.add(response);
        }
        return responses;
    }

    public ConstructionTasksAndStatusResponse detailOfConstruct(String constructionOrderId) {
        List<ConstructionTasks> constructionTasksList = this.findConstructionTasks(constructionOrderId);
        ConstructionOrder order = this.findOrderById(constructionOrderId);

        Customer customer = this.findCustomerById(order.getCustomerId());
        return ConstructionTasksAndStatusResponse.builder()
                .constructionOrderId(constructionOrderId)
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .constructTaskStatusResponses(this.constructTaskStatusResponseList(constructionTasksList))
                .build();
    }

    public List<StaffResponse> listAllStaffHasNoRole() {
        return this.listStaffHasNoRole();
    }

    public AssignConstructionTaskResponse assignTask(String constructionOrderId, AssignTaskStaffRequest request) {
        String staffName = staffRepository.findById(request.getStaffId()).orElseThrow().getStaffName();
        constructionTaskStaffRepository.save(constructionTaskStaff(request, staffName));
        return AssignConstructionTaskResponse.builder()
                .taskId(request.getTaskId())
                .staffName(staffName)
                .build();
    }

    public CompleteConstructionTaskResponse completeTask(String constructionOrderId, CompleteConstructTaskRequest request) {
        ConstructionTasks task = constructionTasksRepository
                .findByConstructionOrderIdAndTaskId(constructionOrderId, request.getTaskId());
        task.setStatus(ConstructStatus.DONE);
        constructionTasksRepository.save(task);
        List<ConstructStatus> statuses = List.of(ConstructStatus.NOT_YET, ConstructStatus.IN_PROGRESS);
        List<ConstructionTasks> listInCompleteTasks = constructionTasksRepository
                .findByConstructionOrderIdAndStatusIn(constructionOrderId, statuses);
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        if (listInCompleteTasks.isEmpty()) {
                order.setStatus(ConstructionOrderStatus.CONSTRUCTED);
        }
        List<ConstructionTasks> listCompleteTasks = constructionTasksRepository
                .findByStatus(ConstructStatus.DONE);
        return CompleteConstructionTaskResponse.builder()
                .completeList(listCompleteTasks)
                .status(order.getStatus())
                .build();
    }

    ConstructOrderDetailForStaffResponse detailOfOrder(String constructionOrderId) {
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        Customer customer = this.findCustomerById(order.getCustomerId());
        return ConstructOrderDetailForStaffResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .customerRequest(order.getCustomerRequest())
                .build();
    }

    List<ConstructionTasks> findConstructionTasks(String constructionOrderId) {
        return constructionTasksRepository.findByConstructionOrderId(constructionOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found for id: " + constructionOrderId));
    }

    PackageConstruction findPackageConstruction(String packageConstructionId) {
        return packageConstructionRepository.findById(packageConstructionId)
                .orElseThrow(() -> new RuntimeException("Package construction not found for id: " + packageConstructionId));
    }

    List<ConstructTaskStatusResponse> constructTaskStatusResponseList(List<ConstructionTasks> constructionTasksList) {
        List<ConstructTaskStatusResponse> constructTaskStatusResponseList = new ArrayList<>();
        for (ConstructionTasks constructionTask : constructionTasksList) {

             ConstructionTaskStaff taskStaff = constructionTaskStaffRepository.findById(constructionTask.getTaskId())
                    .orElse(null);
            PackageConstruction packageConstruction = this.findPackageConstruction(constructionTask.getPackageConstructionId());
            ConstructTaskStatusResponse statusResponse = ConstructTaskStatusResponse.builder()
                    .packageConstructionId(constructionTask.getPackageConstructionId())
                    .taskId(constructionTask.getTaskId())
                    .content(packageConstruction.getContent())
                    .status(constructionTask.getStatus())
                    .build();
            if (taskStaff != null) {
                statusResponse.setStaffId(taskStaff.getStaffId());
            } else {
                statusResponse.setStaffId("");
            }
            constructTaskStatusResponseList.add(statusResponse);
        }
        return constructTaskStatusResponseList;
    }

    Staff identifyStaff() {
        var context = SecurityContextHolder.getContext();
        String accountId = context.getAuthentication().getName();
        return staffRepository.findByAccountId(accountId)
                .orElseThrow(() -> new RuntimeException("Error"));
    }

    ConstructionOrder findOrderById(String orderId){
        return constructOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    Customer findCustomerById(String customerId){
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
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

    ConstructionTaskStaff constructionTaskStaff(AssignTaskStaffRequest request, String staffName){
        return ConstructionTaskStaff.builder()
                .taskId(request.getTaskId())
                .staffId(request.getStaffId())
                .staffName(staffName)
                .build();
    }

}
