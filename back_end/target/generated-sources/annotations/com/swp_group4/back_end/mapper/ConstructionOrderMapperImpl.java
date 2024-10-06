package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.ConstructionOrder;
import com.swp_group4.back_end.responses.ConstructOrderResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.v20240919-1711, environment: Java 17.0.12 (Eclipse Adoptium)"
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
        response.setStatus( constructionOrder.getStatus() );
        response.setTotal( constructionOrder.getTotal() );

        return response;
    }
}
