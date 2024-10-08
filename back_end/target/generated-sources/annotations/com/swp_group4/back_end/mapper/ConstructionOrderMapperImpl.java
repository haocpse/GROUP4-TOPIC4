package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.enums.ConstructionOrderStatus;
import com.swp_group4.back_end.enums.DesignStatus;
import com.swp_group4.back_end.requests.StaffAssignedRequest;
import com.swp_group4.back_end.responses.ConstructOrderDetailForManagerResponse;
import com.swp_group4.back_end.responses.ConstructOrderResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Amazon.com Inc.)"
)
@Component
public class ConstructionOrderMapperImpl implements ConstructionOrderMapper {

    @Override
    public ConstructOrderResponse constructOrderResponse(ConstructionOrder constructionOrder, ConstructOrderResponse response) {
        if ( constructionOrder == null ) {
            return response;
        }

        response.setConstructionOrderId( constructionOrder.getConstructionOrderId() );
        response.setCustomerId( constructionOrder.getCustomerId() );
        response.setCustomerRequest( constructionOrder.getCustomerRequest() );
        response.setTotal( constructionOrder.getTotal() );
        response.setStatus( constructionOrder.getStatus() );

        return response;
    }

    @Override
    public ConstructionOrder toConstructionOrder(StaffAssignedRequest request, ConstructionOrder order) {
        if ( request == null ) {
            return order;
        }

        if ( request.getConstructionOrderId() != null ) {
            order.setConstructionOrderId( request.getConstructionOrderId() );
        }
        if ( request.getConsultant() != null ) {
            order.setConsultant( request.getConsultant() );
        }
        if ( request.getStatus() != null ) {
            order.setStatus( request.getStatus() );
        }

        return order;
    }

    @Override
    public ConstructOrderDetailForManagerResponse toDetailForManager(ConstructionOrder order, ConstructOrderDetailForManagerResponse detail) {
        if ( order == null ) {
            return detail;
        }

        if ( order.getConstructionOrderId() != null ) {
            detail.setOrderId( order.getConstructionOrderId() );
        }
        if ( order.getStatus() != null ) {
            detail.setOrderStatus( order.getStatus() );
        }
        detail.setTotalPrice( order.getTotal() );
        if ( order.getStartDate() != null ) {
            detail.setStartDate( order.getStartDate() );
        }
        if ( order.getEndDate() != null ) {
            detail.setEndDate( order.getEndDate() );
        }

        return detail;
    }

    @Override
    public ConstructionOrder toConstructionOrder(Design design, ConstructionOrder order) {
        if ( design == null ) {
            return order;
        }

        order.setDesignId( design.getDesignId() );
        order.setStatus( designStatusToConstructionOrderStatus( design.getStatus() ) );

        return order;
    }

    protected ConstructionOrderStatus designStatusToConstructionOrderStatus(DesignStatus designStatus) {
        if ( designStatus == null ) {
            return null;
        }

        ConstructionOrderStatus constructionOrderStatus;

        switch ( designStatus ) {
            case DESIGNED: constructionOrderStatus = ConstructionOrderStatus.DESIGNED;
            break;
            case CONFIRMED_DESIGN: constructionOrderStatus = ConstructionOrderStatus.CONFIRMED_DESIGN;
            break;
            default: throw new IllegalArgumentException( "Unexpected enum constant: " + designStatus );
        }

        return constructionOrderStatus;
    }
}
