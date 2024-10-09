package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.*;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.mapper.*;
import com.swp_group4.back_end.repositories.*;
import com.swp_group4.back_end.requests.UrlDesignRequest;
import com.swp_group4.back_end.responses.ConstructOrderDetailForStaffResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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
    @Lazy
    StaffService staffService;
    @Autowired
    ConstructionOrderMapperImpl constructionOrderMapper;
    @Autowired
    @Lazy
    ManageConstructionOrderService manageConstructionOrderService;


    public List<ConstructOrderDetailForStaffResponse> listOwnedDesignTask() {
        return staffService.listOwnedStaffTask();
    }

    public ConstructOrderDetailForStaffResponse detailOfOrder(String constructionOrderId) {
        Staff staff = staffService.identifyStaff();
        return staffService.detailOfOrder(constructionOrderId, staff.getStaffName());
    }

    public Design uploadDesign(String constructionOrderId, UrlDesignRequest request) {
        Design design = Design.builder()
                .status(DesignStatus.DESIGNED)
                .build();
        designRepository.save(designMapper.toDesgin(request, design));
        ConstructionOrder order = manageConstructionOrderService.findConstructOrder(constructionOrderId);
        constructOrderRepository.save(constructionOrderMapper.toConstructionOrder(design, order));
        return design;
    }


}
