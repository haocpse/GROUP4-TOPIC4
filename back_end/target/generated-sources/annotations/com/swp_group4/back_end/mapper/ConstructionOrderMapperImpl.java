package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.responses.ConstructOrderResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Oracle Corporation)"
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
}
