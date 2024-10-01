package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.requests.QuotationDetailRequest;
import com.swp_group4.back_end.responses.QuotationResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface QuotationMapper {

    Quotation toQuotation(QuotationDetailRequest request, @MappingTarget Quotation quotation);
    QuotationResponse toQuotationResponse(Quotation quotation, @MappingTarget QuotationResponse quotationResponse);
}
