package com.swp_group4.back_end.services;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.mapper.DesignMapper;
import com.swp_group4.back_end.repositories.ConstructOrderRepository;
import com.swp_group4.back_end.repositories.DesignRepository;
import com.swp_group4.back_end.requests.UrlDesignRequest;
import com.swp_group4.back_end.responses.ConstructOrderStatusTransitionResponse;
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
    HelperService helperService;

    public List<ConstructOrderStatusTransitionResponse<ConstructionOrderStatus>> listOwnedDesignTask() {
        List<ConstructionOrderStatus> statusList = List.of(ConstructionOrderStatus.DESIGNING);
        return helperService.orderInStepResponses(statusList);
    }

    public ConstructOrderStatusTransitionResponse<ConstructionOrderStatus> detailOfOrder(String constructionOrderId) {
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
        return helperService.detailOfOrder(order);
    }

    public Design uploadDesign(String constructionOrderId, UrlDesignRequest request) {
        Design design = new Design();
        designMapper.toDesgin(request, design);
        designRepository.save(design);
        ConstructionOrder order = constructOrderRepository.findById(constructionOrderId).orElseThrow(
                () -> new RuntimeException("Order not found for id: " + constructionOrderId));
        order.setDesignId(design.getDesignId());
      
        constructOrderRepository.save(order);
        return design;
    }
}
