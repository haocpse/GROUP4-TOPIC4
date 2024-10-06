package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.requests.ExportQuotationRequest;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class QuotationMapperImpl implements QuotationMapper {

    @Override
    public Quotation toQuotation(ExportQuotationRequest request, Quotation quotation) {
        if ( request == null ) {
            return quotation;
        }

        quotation.setVolume( request.getVolume() );
        quotation.setPriceStage1( request.getPriceStage1() );
        quotation.setPriceStage2( request.getPriceStage2() );
        quotation.setPriceStage3( request.getPriceStage3() );
        quotation.setPromotionId( request.getPromotionId() );
        quotation.setPackageId( request.getPackageId() );

        return quotation;
    }

    @Override
    public ConstructQuotationResponse toQuotationResponse(Quotation quotation, ConstructQuotationResponse constructQuotationResponse) {
        if ( quotation == null ) {
            return constructQuotationResponse;
        }

        constructQuotationResponse.setQuotationId( quotation.getQuotationId() );
        constructQuotationResponse.setVolume( quotation.getVolume() );
        constructQuotationResponse.setPriceStage1( quotation.getPriceStage1() );
        constructQuotationResponse.setPriceStage2( quotation.getPriceStage2() );
        constructQuotationResponse.setPriceStage3( quotation.getPriceStage3() );

        return constructQuotationResponse;
    }
}
