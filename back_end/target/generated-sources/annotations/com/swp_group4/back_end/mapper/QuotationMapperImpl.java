package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.requests.QuotationDetailRequest;
import com.swp_group4.back_end.responses.QuotationResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.40.0.v20240919-1711, environment: Java 17.0.12 (Eclipse Adoptium)"
)
@Component
public class QuotationMapperImpl implements QuotationMapper {

    @Override
    public Quotation toQuotation(QuotationDetailRequest request, Quotation quotation) {
        if ( request == null ) {
            return quotation;
        }

        quotation.setPackageId( request.getPackageId() );
        quotation.setPriceStage1( request.getPriceStage1() );
        quotation.setPriceStage2( request.getPriceStage2() );
        quotation.setPriceStage3( request.getPriceStage3() );
        quotation.setPromotionId( request.getPromotionId() );

        return quotation;
    }

    @Override
    public QuotationResponse toQuotationResponse(Quotation quotation, QuotationResponse quotationResponse) {
        if ( quotation == null ) {
            return quotationResponse;
        }

        quotationResponse.setPriceStage1( quotation.getPriceStage1() );
        quotationResponse.setPriceStage2( quotation.getPriceStage2() );
        quotationResponse.setPriceStage3( quotation.getPriceStage3() );
        quotationResponse.setQuotationId( quotation.getQuotationId() );

        return quotationResponse;
    }
}
