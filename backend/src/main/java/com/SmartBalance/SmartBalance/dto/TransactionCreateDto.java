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
public class TransactionCreateDto {

    private String buyer;

    @NotEmpty
    private LocalDate date;
    @NotBlank
    private String description;
    @NotNull
    private Integer quantity;
    @NotEmpty
    private TransactionType type;
    @NotNull
    private BigDecimal value;

    public Transaction toEntity(){
        Transaction transaction = new Transaction();

        transaction.setBuyer(this.getBuyer());
        transaction.setDate(this.getDate());
        transaction.setDescription(this.getDescription());
        transaction.setType(this.getType());
        transaction.setQuantity(Long.valueOf(this.getQuantity()));
        transaction.setValue((this.getValue()));

        return transaction;
    };
}
