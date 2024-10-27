package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructStatus;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.*;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.*;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class ManageConstructionOrderService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    ConstructionOrderMapper constructionOrderMapper;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    private ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    ConstructionTaskStaffRepository constructionTaskStaffRepository;

    public List<ConstructOrderDetailForManagerResponse> listAllOrder() {
        List<ConstructOrderDetailForManagerResponse> responses = new ArrayList<>();
        List<ConstructionOrder> constructionOrders = constructOrderRepository.findAll();
        for (ConstructionOrder constructionOrder : constructionOrders) {
            Customer customer = this.findCustomerById(constructionOrder.getCustomerId());
            ConstructOrderDetailForManagerResponse response = this.buildConstructOrderDetailForManagerResponse(constructionOrder, customer);
            if (constructionOrder.getQuotationId() != null){
                String type = packageRepository.findById(quotationRepository.findById(constructionOrder.getQuotationId())
                                .orElseThrow().getPackageId())
                        .orElseThrow().getPackageType();
                response.setPackageType(type);
            }
            responses.add(response);
        }
        return responses;
    }

    public ConstructOrderDetailForManagerResponse assignLeader(StaffAssignedRequest request){
        ConstructionOrder order = this.findConstructOrder(request.getConstructionOrderId());
        Customer customer = this.findCustomerById(order.getCustomerId());
        constructOrderRepository.save(constructionOrderMapper.toConstructionOrder(request, order));
        return this.buildConstructOrderDetailForManagerResponse(order, customer);
    }

    ConstructOrderDetailForManagerResponse buildConstructOrderDetailForManagerResponse(ConstructionOrder order, Customer customer) {
        ConstructOrderDetailForManagerResponse response = ConstructOrderDetailForManagerResponse.builder()
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .consultantId(order.getConsultantId())
                .designerLeaderId(order.getDesignerLeaderId())
                .constructorLeaderId(order.getConstructorLeaderId())
                .endDate(order.getConstructionEndDate())
                .build();
        constructionOrderMapper.toDetailForManager(order, response);
        customerMapper.toDetailForManager(customer, response);
        return response;
    }


    Customer findCustomerById(String customerId){
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    ConstructionOrder findConstructOrder(String constructionOrderId) {
        return constructOrderRepository.findById(constructionOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<ProgressReviewResponse> listAllConstructionProgress() {
        List<ConstructionOrder> constructionOrders = constructOrderRepository.findAll();
        List<ProgressReviewResponse> responses = new ArrayList<>();
        for (ConstructionOrder constructionOrder : constructionOrders) {
            List<ConstructStatus> statuses = List.of(ConstructStatus.NOT_YET, ConstructStatus.IN_PROGRESS);
            List<ConstructionTasks> listInCompleteTasks = constructionTasksRepository.findByConstructionOrderIdAndStatusIn(constructionOrder.getConstructionOrderId(), statuses);
            Staff staff = staffRepository.findById(constructionOrder.getConstructorLeaderId()).orElseThrow();
            Customer customer = findCustomerById(constructionOrder.getCustomerId());
            ProgressReviewResponse response = ProgressReviewResponse.builder()
                    .constructionOrderId(constructionOrder.getConstructionOrderId())
                    .leaderName(staff.getStaffName())
                    .startDate(constructionOrder.getConstructionStartDate())
                    .endDate(constructionOrder.getConstructionEndDate())
                    .customerName(customer.getFirstName() + " " + customer.getLastName())
                    .build();
            if (listInCompleteTasks.isEmpty()){
                response.setStatus(ConstructionOrderStatus.CONSTRUCTED);
            } else {
                response.setStatus(ConstructionOrderStatus.CONSTRUCTING);
            }
            responses.add(response);
        }
        return responses;
    }

    public ViewProgressResponse detailProgress(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        List<ListConstructProgressResponse> listConstructProgressResponses = new ArrayList<>();
        List<ConstructionTasks> constructionTasks = constructionTasksRepository.findByConstructionOrderId(constructionOrderId).orElseThrow();
        for (ConstructionTasks constructionTask : constructionTasks) {
            String content = packageConstructionRepository.findById(constructionTask.getPackageConstructionId()).orElseThrow().getContent();
            ListConstructProgressResponse response = ListConstructProgressResponse.builder()
                    .packageConstructionId(constructionTask.getPackageConstructionId())
                    .taskId(constructionTask.getTaskId())
                    .startDate(constructionTask.getStartDate())
                    .endDate(constructionTask.getEndDate())
                    .content(content)
                    .status(constructionTask.getStatus())
                    .build();
            listConstructProgressResponses.add(response);
        }
        List<String> staffNames = constructionTaskStaffRepository.findStaffNamesByTaskId(constructionTasks.getFirst().getTaskId());
        return ViewProgressResponse.builder()
                .constructionOrderId(constructionOrderId)
                .listConstructProgressResponses(listConstructProgressResponses)
                .staffNames(staffNames)
                .status(order.getStatus())
                .build();
    }

//    public List<PaymentReviewResponse> listAllPayments() {
//
//    }
    //    public ServiceResponse<MaintenanceOrderResponse> contactUsForMaintenance(ServiceRequest serviceRequest) {
    // Your logic for maintenance service...
    //    }

}
