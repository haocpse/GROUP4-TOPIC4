package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.Design;
import com.swp_group4.back_end.requests.UrlDesignRequest;
import com.swp_group4.back_end.responses.DesignResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DesignMapper {

    Design toDesgin(UrlDesignRequest request, @MappingTarget Design design);
    DesignResponse toDesignResponse(Design design, @MappingTarget DesignResponse designResponse);

}