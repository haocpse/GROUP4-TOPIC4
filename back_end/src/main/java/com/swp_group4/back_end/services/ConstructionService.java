package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructStatus;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.StaffMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.AssignTaskStaffRequest;
import com.swp_group4.back_end.requests.CompleteConstructTaskRequest;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConstructionService {

    @Autowired
    StaffRepository staffRepository;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    StaffMapper staffMapper;
    @Autowired
    HelperService helperService;

    public List<ConstructionOrderInStepResponse> listOwnedConstructTask() {
        List<ConstructionOrderStatus> statusList = List.of(ConstructionOrderStatus.CONFIRM_DESIGN,
                                                            ConstructionOrderStatus.CONSTRUCTING,
                                                            ConstructionOrderStatus.CONSTRUCTED);
        return helperService.orderInStepResponses(statusList, "statusAndStaffId");
    }

    public ConstructStepResponse detailOfConstruct(String constructionOrderId) {
        List<ConstructionTasks> constructionTasksList = constructionTasksRepository.findByConstructionOrderId(constructionOrderId);
        List<ConstructionStatusResponse> constructionStatusResponseList = new ArrayList<>();
        for(ConstructionTasks constructionTask : constructionTasksList) {
            PackageConstruction packageConstruction = packageConstructionRepository.findById(constructionTask.getPackageConstructionId()).orElseThrow(
                    () -> new RuntimeException("Package construction not found for id: " + constructionTask.getPackageConstructionId()));
            ConstructionStatusResponse statusResponse = ConstructionStatusResponse.builder()
                    .packageConstructionId(constructionTask.getPackageConstructionId())
                    .content(packageConstruction.getContent())
                    .status(constructionTask.getStatus())
                    .build();
            constructionStatusResponseList.add(statusResponse);
        }
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
        Customer customer = customerRepository.findById(order.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found for id: " + order.getCustomerId()));
        return ConstructStepResponse.builder()
                .constructionOrderId(constructionOrderId)
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .constructionStatusResponses(constructionStatusResponseList)
                .build();
    }

    public List<ConstructorStaffResponse> listAllStaff() {
        List<Staff> staffList = staffRepository.findByAccountIdIsNull();
        List<ConstructorStaffResponse> responseList = new ArrayList<>();
        for (Staff staff : staffList) {
            ConstructorStaffResponse response = new ConstructorStaffResponse();
            staffMapper.toStaffResponse(staff, response);
            responseList.add(response);
        }
        return responseList;
    }

    public AssignConstructionTaskResponse assignTask(String constructionOrderId, AssignTaskStaffRequest request) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
        if (order.getStatus().equals(ConstructionOrderStatus.CONFIRM_DESIGN)) {
            order.setStatus(ConstructionOrderStatus.CONSTRUCTING);
            constructOrderRepository.save(order);
        }
        Staff staff = staffRepository.findById(request.getStaffId()).orElseThrow(
                () -> new RuntimeException("Staff not found for id: " + request.getStaffId()));
        return AssignConstructionTaskResponse.builder()
                .taskId(request.getTaskId())
                .staffName(staff.getStaffName())
                .build();
    }

    public CompleteConstructTaskResponse completeTask(String constructionOrderId, CompleteConstructTaskRequest request) {
        ConstructionTasks task = constructionTasksRepository
                .findByConstructionOrderIdAndTaskId(constructionOrderId, request.getTaskId());
        task.setStatus(ConstructStatus.DONE);
        constructionTasksRepository.save(task);
        List<ConstructStatus> statuses = List.of(ConstructStatus.NOT_YET, ConstructStatus.IN_PROGRESS);
        List<ConstructionTasks> listInCompleteTasks = constructionTasksRepository
                .findByConstructionOrderIdAndStatusIn(constructionOrderId, statuses);
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
        if (listInCompleteTasks.isEmpty()) {
                order.setStatus(ConstructionOrderStatus.CONSTRUCTED);
        }
        List<ConstructionTasks> listCompleteTasks = constructionTasksRepository
                .findByStatus(ConstructStatus.DONE);
        return CompleteConstructTaskResponse.builder()
                .completeList(listCompleteTasks)
                .status(order.getStatus())
                .build();
    }

}
