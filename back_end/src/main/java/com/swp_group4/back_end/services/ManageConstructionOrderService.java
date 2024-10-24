package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
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
    //    public ServiceResponse<MaintenanceOrderResponse> contactUsForMaintenance(ServiceRequest serviceRequest) {
    // Your logic for maintenance service...
    //    }

}
