package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.entities.Staff;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.mapper.DesignMapper;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.DesignRepository;
import com.swp_group4.back_end.requests.UrlDesignRequest;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
public class DesignService {

    @Autowired
    ConstructOrderRepository constructOrderRepository;
    @Autowired
    DesignRepository designRepository;
    @Autowired
    DesignMapper designMapper;
    @Autowired
    StaffService staffService;


    public List<ConstructOrderDetailForStaffResponse> listOwnedDesignTask() {
        return staffService.listOwnedStaffTask();
    }

    public ConstructOrderDetailForStaffResponse detailOfOrder(String constructionOrderId) {
        Staff staff = staffService.identifyStaff();
        return staffService.detailOfOrder(constructionOrderId, staff.getStaffName());
    }

    public Design uploadDesign(String constructionOrderId, UrlDesignRequest request) {
        Design design = new Design();
        design.setStatus(DesignStatus.DESIGNED);
        designMapper.toDesgin(request, design);
        designRepository.save(design);
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
        order.setDesignId(design.getDesignId());
        order.setStatus(ConstructionOrderStatus.DESIGNED);
        constructOrderRepository.save(order);
        return design;
    }
}
