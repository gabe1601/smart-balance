package com.SmartBalance.SmartBalance.repository;

import com.SmartBalance.SmartBalance.enums.TransactionType;
import com.SmartBalance.SmartBalance.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long> {


    @Query("SELECT SUM(t.value) FROM Transaction t WHERE t.type =0")
    public BigDecimal sumValuesByTypes();

}
