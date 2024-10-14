package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.mapper.CustomerMapper;
import com.swp_group4.back_end.mapper.QuotationMapper;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.ServiceRequest;
import com.swp_group4.back_end.responses.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    CustomerMapper customerMapper;
    @Autowired
    @Lazy
    ManageConstructionOrderService manageConstructionOrderService;
    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    QuotationRepository quotationRepository;
    @Autowired
    PackageRepository packageRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    ConstructionTasksRepository constructionTasksRepository;
    @Autowired
    PackageConstructionRepository packageConstructionRepository;
    @Autowired
    QuotationMapper quotationMapper;
    @Autowired
    DesignRepository designRepository;

    public void createCustomer(String accountId, String firstname) {
        customerRepository.save(Customer.builder()
                .accountId(accountId)
                .firstname(firstname)
                .build());
    }

//    public CustomerResponse getOwnedInfo(){
//        Customer customer = this.identifyCustomer();
//        CustomerResponse response = new CustomerResponse();
//        return customerMapper.customerToResponse(customer, response);
//    }

//    public CustomerResponse updateOwnedInfo(UpdateInfoRequest request) {
//        Customer customer = this.identifyCustomer();
//        customerMapper.updateInfoToCustomer(request, customer);
//        customerRepository.save(customer);
//        CustomerResponse response = new CustomerResponse();
//        return customerMapper.customerToResponse(customer, response);
//    }

    public ServiceResponse<?> contactUs(ServiceRequest serviceRequest) {
//        Customer customer = this.identifyCustomer();
//        customerMapper.serviceRequestToCustomer(serviceRequest, customer);
//        customerRepository.save(customer);
        if (serviceRequest.getService().name().equals("CONSTRUCTION_SERVICE")) {
            ConstructionOrder constructionOrder = manageConstructionOrderService.createOrder(serviceRequest);
            return manageConstructionOrderService.contactUsForConstruction(serviceRequest, constructionOrder);
        }
//        if (serviceRequest.getService().name().equals("MAINTENANCE_SERVICE")) {
//          return contactUsForMaintenance(serviceRequest);
//        }
       return null;
    }

    public List<ConstructOrderDetailForCustomerResponse> listOrders() {
        List<ConstructionOrder> orderList = constructOrderRepository.findAll();
        List<ConstructOrderDetailForCustomerResponse> responses = new ArrayList<>();
        for (ConstructionOrder order : orderList) {
            ConstructOrderDetailForCustomerResponse response = ConstructOrderDetailForCustomerResponse.builder()
                    .constructionOrderId(order.getConstructionOrderId())
                    .customerName(customerRepository.findById(order.getCustomerId()).orElseThrow().getFirstname()
                            + " " + customerRepository.findById(order.getCustomerId()).orElseThrow().getLastname())
                    .quotationId(order.getQuotationId())
                    .designId(order.getDesignId())
                    .startDate(order.getStartDate())
                    .endDate(order.getEndDate())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public ConstructQuotationResponse viewQuotation(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        Quotation quotation = quotationRepository.findById(order.getQuotationId())
                .orElseThrow(() -> new RuntimeException("Quotation not found"));
        Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow();
        Packages packages = packageRepository.findById(quotation.getPackageId()).orElseThrow();
        ConstructQuotationResponse response = ConstructQuotationResponse.builder()
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .consultantName(staffRepository.findById(order.getConsultantId()).orElseThrow().getStaffName())
                .customerRequest(order.getCustomerRequest())
                .packageType(packages.getPackageType())
                .totalPrice(order.getTotal())
                .content(this.findContentOfTask(constructionOrderId))
                .build();
        return quotationMapper.toQuotationResponse(quotation, response);
    }

    private List<String> findContentOfTask(String constructionOrderId){
        List<ConstructionTasks> tasks = constructionTasksRepository.findByConstructionOrderId(constructionOrderId).orElseThrow();
        List<String> taskList = new ArrayList<>();
        for (ConstructionTasks task : tasks) {
            String content = packageConstructionRepository.findById(task.getPackageConstructionId()).orElseThrow().getContent();
            taskList.add(content);
        }
        return taskList;
    }

    public ConstructDesignResponse viewDesign(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow();
        Design design = designRepository.findById(order.getDesignId()).orElseThrow();
        Customer customer = customerRepository.findById(order.getCustomerId()).orElseThrow();
        return ConstructDesignResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstname() + " " + customer.getLastname())
                .designName(staffRepository.findById(order.getDesignerLeaderId()).orElseThrow().getStaffName())
                .customerRequest(order.getCustomerRequest())
                .url2dDesign(design.getUrl2dDesign())
                .url3dDesign(design.getUrl3dDesign())
                .urlFrontDesign(design.getUrlFrontDesign())
                .urlBackDesign(design.getUrlBackDesign())
                .build();
    }

//    Customer identifyCustomer() {
//        var context = SecurityContextHolder.getContext();
//        String accountId = context.getAuthentication().getName();
//        return customerRepository.findByAccountId(accountId)
//                .orElseThrow(() -> new RuntimeException("Customer not found"));
//    }

}
