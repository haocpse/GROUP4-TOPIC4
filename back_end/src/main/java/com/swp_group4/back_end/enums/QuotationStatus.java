package com.swp_group4.back_end.enums;

public enum QuotationStatus {

    QUOTED, // Trạng thái của QUOTATION sau khi CONSULTANT export 1 QUOTATION
    CONFIRMED, // Trạng thái của QUOTATION sau khi được phê duyệt từ MANAGER
    REJECTED,
    CONFIRMED_BY_USER,
}
