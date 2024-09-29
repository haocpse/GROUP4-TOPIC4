package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.requests.QuotationDetailRequest;
import com.swp_group4.back_end.responses.QuotationResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class QuotationMapperImpl implements QuotationMapper {

    @Override
    public Quotation toQuotation(QuotationDetailRequest request, Quotation quotation) {
        if ( request == null ) {
            return quotation;
        }

        quotation.setPriceStage1( request.getPriceStage1() );
        quotation.setPriceStage2( request.getPriceStage2() );
        quotation.setPriceStage3( request.getPriceStage3() );
        quotation.setPromotionId( request.getPromotionId() );
        quotation.setPackageId( request.getPackageId() );

        return quotation;
    }

    @Override
    public QuotationResponse toQuotationResponse(Quotation quotation, QuotationResponse quotationResponse) {
        if ( quotation == null ) {
            return quotationResponse;
        }

        quotationResponse.setQuotationId( quotation.getQuotationId() );
        quotationResponse.setPriceStage1( quotation.getPriceStage1() );
        quotationResponse.setPriceStage2( quotation.getPriceStage2() );
        quotationResponse.setPriceStage3( quotation.getPriceStage3() );

        return quotationResponse;
    }
}
