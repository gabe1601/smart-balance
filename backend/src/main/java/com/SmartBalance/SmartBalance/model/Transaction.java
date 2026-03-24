package com.SmartBalance.SmartBalance.model;

import com.SmartBalance.SmartBalance.enums.TransactionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name="transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Long quantity;
    private BigDecimal value;
    private LocalDate date = LocalDate.now();
    private TransactionType type;
    private String buyer;

    @PrePersist
    public void prePersist() {
        if (this.date == null) {
            this.date = LocalDate.now();
        }
    }

}
