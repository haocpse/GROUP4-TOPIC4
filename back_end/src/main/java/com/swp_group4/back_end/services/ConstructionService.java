package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.*;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.*;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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
    @Lazy
    StaffService staffService;
    @Autowired
    ConstructionTaskStaffRepository constructionTaskStaffRepository;
    @Autowired
    @Lazy
    ManageConstructionOrderService manageConstructionOrderService;
    @Autowired
    @Lazy
    CustomerService customerService;

    public List<ConstructOrderDetailForStaffResponse> listOwnedConstructTask() {
        return staffService.listOwnedStaffTask();
    }

    public ConstructionTasksAndStatusResponse detailOfConstruct(String constructionOrderId) {
        List<ConstructionTasks> constructionTasksList = this.findConstructionTasks(constructionOrderId);
        ConstructionOrder order = manageConstructionOrderService.findConstructOrder(constructionOrderId);
        Customer customer = customerService.findCustomer(order.getCustomerId());
        return ConstructionTasksAndStatusResponse.builder()
                .constructionOrderId(constructionOrderId)
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .constructTaskStatusResponses(this.constructTaskStatusResponseList(constructionTasksList))
                .build();
    }

    public List<StaffResponse> listAllStaffHasNoRole() {
        return staffService.listStaffHasNoRole();
    }

    public AssignConstructionTaskResponse assignTask(String constructionOrderId, AssignTaskStaffRequest request) {
        ConstructionOrder order = manageConstructionOrderService.findConstructOrder(constructionOrderId);
        order.setStatus(ConstructionOrderStatus.CONSTRUCTING);
        constructOrderRepository.save(order);
        Staff staff = staffService.findStaff(order.getCustomerId());
        constructionTaskStaffRepository.save(this.constructionTaskStaff(request, staff.getStaffName()));
        return AssignConstructionTaskResponse.builder()
                .taskId(request.getTaskId())
                .staffName(staff.getStaffName())
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
        ConstructionOrder order = manageConstructionOrderService.findConstructOrder(constructionOrderId);
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
            PackageConstruction packageConstruction = this.findPackageConstruction(constructionTask.getPackageConstructionId());
            ConstructTaskStatusResponse statusResponse = ConstructTaskStatusResponse.builder()
                    .packageConstructionId(constructionTask.getPackageConstructionId())
                    .content(packageConstruction.getContent())
                    .status(constructionTask.getStatus())
                    .build();
            constructTaskStatusResponseList.add(statusResponse);
        }
        return constructTaskStatusResponseList;
    }

    ConstructionTaskStaff constructionTaskStaff(AssignTaskStaffRequest request, String staffName){
        ConstructionTaskStaffKey key = ConstructionTaskStaffKey.builder()
                .staffId(request.getStaffId())
                .taskId(request.getTaskId())
                .build();
        return ConstructionTaskStaff.builder()
                .id(key)
                .staffName(staffName)
                .build();
    }

}
