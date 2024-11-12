package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.*;
import com.swp_group4.back_end.mapper.ConstructionTasksMapper;
import com.swp_group4.back_end.mapper.StaffMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.*;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
    @Autowired
    ConstructionTasksMapper constructionTasksMapper;

    public ConstructionTasksAndStatusResponse detailOfConstruct(String constructionOrderId) {
        List<ConstructionTasks> constructionTasksList = this.findConstructionTasks(constructionOrderId);
        List<String> staffId = constructionTaskStaffRepository.findStaffIdsByTaskId(constructionTasksList.getFirst().getTaskId());
        List<Staff> staffList = new ArrayList<>();
        for (String id : staffId) {
            Staff staff = staffRepository.findById(id).orElseThrow();
            staffList.add(staff);
        }
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        Customer customer = this.findCustomerById(order.getCustomerId());
        return ConstructionTasksAndStatusResponse.builder()
                .constructionOrderId(constructionOrderId)
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .constructTaskStatusResponses(this.constructTaskStatusResponseList(constructionTasksList))
                .staffs(staffList)
                .build();
    }

    public List<StaffResponse> listAllStaffHasNoRole() {
        return this.listStaffHasNoRole();
    }

    public AssignConstructionTaskResponse assignTask(String constructionOrderId, AssignTaskStaffRequest request) {
        List<String> staffName = new ArrayList<>();
        List<ConstructionTasks> constructionTasksList = this.findConstructionTasks(constructionOrderId);
        for (ConstructionTasks constructionTasks : constructionTasksList) {
            List<String> staffIds = request.getStaffIds();
            for (String staffId : staffIds) {
                ConstructionTaskStaffId taskStaffId = ConstructionTaskStaffId.builder()
                        .taskId(constructionTasks.getTaskId())
                        .staffId(staffId)
                        .build();
                ConstructionTaskStaff taskStaff = ConstructionTaskStaff.builder()
                        .id(taskStaffId)
                        .staffName(staffRepository.findById(staffId).orElseThrow().getStaffName())
                        .build();
                constructionTaskStaffRepository.save(taskStaff);
                staffName.add(taskStaff.getStaffName());
            }
        }
        return AssignConstructionTaskResponse.builder()
                .constructionOrderId(constructionOrderId)
                .staffName(staffName)
                .build();
    }

    public CompleteConstructionTaskResponse completeTask(String constructionOrderId, CompleteConstructTaskRequest request) {
        ConstructionTasks task = constructionTasksRepository
                .findByConstructionOrderIdAndTaskId(constructionOrderId, request.getTaskId());
        task.setStatus(request.getStatus());
        constructionTasksRepository.save(task);
        List<ConstructStatus> statuses = List.of(ConstructStatus.NOT_YET, ConstructStatus.IN_PROGRESS);
        List<ConstructionTasks> listInCompleteTasks = constructionTasksRepository
                .findByConstructionOrderIdAndStatusIn(constructionOrderId, statuses);
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        if (listInCompleteTasks.isEmpty()) {
            order.setStatus(ConstructionOrderStatus.CONSTRUCTED);
            List<ConstructionTasks> tasks = constructionTasksRepository.findByConstructionOrderId(constructionOrderId).orElseThrow();
            Date endDate = tasks.stream()
                    .map(ConstructionTasks::getEndDate)
                    .filter(Objects::nonNull)
                    .max(Date::compareTo)
                    .orElse(null);
            order.setConstructionEndDate(endDate);
            constructOrderRepository.save(order);
        }
        List<ConstructionTasks> listCompleteTasks = constructionTasksRepository
                .findByStatus(ConstructStatus.DONE);
        return CompleteConstructionTaskResponse.builder()
                .completeList(listCompleteTasks)
                .status(order.getStatus())
                .build();
    }

    List<ConstructionTasks> findConstructionTasks(String constructionOrderId) {
        return constructionTasksRepository.findByConstructionOrderId(constructionOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found for id: " + constructionOrderId));
    }

    List<ConstructTaskStatusResponse> constructTaskStatusResponseList(List<ConstructionTasks> constructionTasksList) {
        List<ConstructTaskStatusResponse> responses = new ArrayList<>();
        for (ConstructionTasks constructionTasks : constructionTasksList) {
            ConstructTaskStatusResponse response = ConstructTaskStatusResponse.builder()
                    .content(packageConstructionRepository.findById(constructionTasks.getPackageConstructionId()).orElseThrow().getContent())
                    .build();
            responses.add(constructionTasksMapper.toConstructTaskStatusResponse(constructionTasks, response));
        }
        return responses;
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

    public DeadlineConstructionResponse deadline(String constructionOrderId, DeadlineConstructionRequest request) {
        ConstructionTasks task = constructionTasksRepository.findById(request.getTaskId()).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStartDate(request.getStartDate());
        task.setEndDate(request.getEndDate());
        constructionTasksRepository.save(task);
        List<ConstructionTasks> tasks = constructionTasksRepository.findByConstructionOrderId(constructionOrderId).orElseThrow();
        Date startDate = tasks.stream()
                .map(ConstructionTasks::getStartDate)
                .filter(Objects::nonNull)
                .min(Date::compareTo)
                .orElse(null);
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        order.setConstructionStartDate(startDate);
        constructOrderRepository.save(order);
        return constructionTasksMapper.mapDeadlineConstructionResponse(task);
    }
}
