package com.swp_group4.back_end.mapper;

import com.swp_group4.back_end.entities.PaymentOrder;
import com.swp_group4.back_end.responses.PaymentInfoResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    PaymentInfoResponse toPaymentInfoResponse(PaymentOrder paymentOrder, @MappingTarget PaymentInfoResponse paymentInfoResponse);
}
