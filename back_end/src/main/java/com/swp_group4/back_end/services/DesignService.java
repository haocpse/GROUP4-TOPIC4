package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.mapper.*;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.UrlDesignRequest;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
@Slf4j
public class DesignService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ConstructOrderRepository constructionOrderMapper;
    @Autowired
    DesignRepository designRepository;
    @Autowired
    DesignMapper designMapper;

    public List<ConstructOrderDetailForStaffResponse> listOwnedDesignTask() {
        List<ConstructOrderDetailForStaffResponse> responses = new ArrayList<>();
//        Staff staff = this.identifyStaff();
        String id = "bc6910eb-8729-11ef-bf00-c85acfa9b517";
        Staff staff = staffRepository.findById(id).orElseThrow(() -> new RuntimeException("Staff not found"));
        List<ConstructionOrder> orders = constructOrderRepository.findByDesignerLeaderId(id);
        for (ConstructionOrder order : orders) {
            ConstructOrderDetailForStaffResponse response = this.detailOfOrder(order.getConstructionOrderId());
            response.setStaffName(staff.getStaffName());
            responses.add(response);
        }
        return responses;
    }

    public ConstructOrderDetailForStaffResponse detailOfOrder(String constructionOrderId) {
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        Customer customer = this.findCustomerById(order.getCustomerId());
        return ConstructOrderDetailForStaffResponse.builder()
                .constructionOrderId(order.getConstructionOrderId())
                .customerName(customer.getFirstName() + " " + customer.getLastName())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .customerRequest(order.getCustomerRequest())
                .staffName(staffRepository.findById(order.getDesignerLeaderId()).orElseThrow().getStaffName())
                .status(order.getStatus())
                .build();
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

    public Design saveDesign(String constructionOrderId, MultipartFile image2D, MultipartFile image3D, MultipartFile frontView) {
        Design design = Design.builder()
                .status(DesignStatus.DESIGNED)
                .build();

        String baseUrl = "http://localhost:8080/images/" + constructionOrderId + "/";

        if (!image2D.isEmpty()) {
            design.setUrl2dDesign(baseUrl + saveImage(image2D, constructionOrderId));
        }
        if (!image3D.isEmpty()) {
            design.setUrl3dDesign(baseUrl + saveImage(image3D, constructionOrderId));
        }
        if (!frontView.isEmpty()) {
            design.setUrlFrontDesign(baseUrl + saveImage(frontView, constructionOrderId));
        }

        // Save the design and update the order status
        designRepository.save(design);
        ConstructionOrder order = this.findOrderById(constructionOrderId);
        order.setStatus(ConstructionOrderStatus.DESIGNED);
        order.setDesignId(design.getDesignId());
        constructOrderRepository.save(order);

        return design;
    }

    private String saveImage(MultipartFile file, String orderId) {
        try {
            // Ensure directory exists
            String UPLOAD_DIR = "images/" + orderId + "/";
            String fileName = Objects.requireNonNull(file.getOriginalFilename()).replace(" ", "_");
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());

            // Write the file to disk
            Files.write(filePath, file.getBytes());

            // Return only the file name so the full path can be built elsewhere
            return fileName;
        } catch (IOException e) {
            log.error("Error saving image", e);
            throw new RuntimeException("Error saving image", e);
        }
    }
}
