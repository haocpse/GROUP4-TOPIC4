package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.requests.UrlDesignRequest;
import com.swp_group4.back_end.responses.ConstructDesignResponse;
import com.swp_group4.back_end.responses.ViewRejectedDesignResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DesignMapper {
    ;
    ConstructDesignResponse toDesignResponse(Design design, @MappingTarget ConstructDesignResponse constructDesignResponse);
    ViewRejectedDesignResponse toViewRejectedDesignResponse(Design design, @MappingTarget ViewRejectedDesignResponse viewRejectedDesignResponse);

}
