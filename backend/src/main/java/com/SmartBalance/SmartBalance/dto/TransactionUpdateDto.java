package com.SmartBalance.SmartBalance.dto;

import com.SmartBalance.SmartBalance.enums.TransactionType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TransactionUpdateDto {

    private Long id;
    private String buyer;
    private String description;
    private Integer quantity;
    private TransactionType type;
    private BigDecimal value;

}
