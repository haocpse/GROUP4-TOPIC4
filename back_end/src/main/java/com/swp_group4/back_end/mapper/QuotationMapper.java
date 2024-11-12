package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Quotation;
import com.swp_group4.back_end.requests.ExportQuotationRequest;
import com.swp_group4.back_end.responses.ConstructQuotationResponse;
import com.swp_group4.back_end.responses.GeneratePDFResponse;
import com.swp_group4.back_end.responses.ViewRejectedQuotationResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface QuotationMapper {
    @Mapping(target = "expectedStartDate", source = "startDate")
    @Mapping(target = "expectedEndDate", source = "endDate")
    Quotation toQuotation(ExportQuotationRequest request, @MappingTarget Quotation quotation);

    @Mapping(target = "startDate", source = "expectedStartDate")
    @Mapping(target = "endDate", source = "expectedEndDate")
    ConstructQuotationResponse toQuotationResponse(Quotation quotation, @MappingTarget ConstructQuotationResponse constructQuotationResponse);

    @Mapping(target = "startDate", source = "expectedStartDate")
    @Mapping(target = "endDate", source = "expectedEndDate")
    ViewRejectedQuotationResponse toViewRejectedQuotationResponse(Quotation quotation, @MappingTarget ViewRejectedQuotationResponse viewRejectedQuotationResponse);

    @Mapping(target = "constructionStartDate", source = "expectedStartDate")
    @Mapping(target = "constructionEndDate", source = "expectedEndDate")
    GeneratePDFResponse toGeneratePdfResponse(Quotation quotation, @MappingTarget GeneratePDFResponse generatePDFResponse);

}
