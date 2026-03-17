package com.SmartBalance.SmartBalance.dto;

import com.SmartBalance.SmartBalance.enums.TransactionType;
import com.SmartBalance.SmartBalance.model.Transaction;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class TransactionResponseDto {

    private Long id;
    private String buyer;
    private LocalDate date;
    private String description;
    private Integer quantity;
    private TransactionType type;
    private BigDecimal value;

    public static TransactionResponseDto fromEntity(Transaction transaction) {

        TransactionResponseDto dto = new TransactionResponseDto();
        dto.setId(transaction.getId());
        dto.setBuyer(transaction.getBuyer());
        dto.setDate(transaction.getDate());
        dto.setDescription(transaction.getDescription());
        dto.setQuantity(Math.toIntExact(transaction.getQuantity()));
        dto.setType(transaction.getType());
        dto.setValue(transaction.getValue());

        return dto;
    }
}
