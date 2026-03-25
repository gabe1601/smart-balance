package com.SmartBalance.SmartBalance.controller;

import com.SmartBalance.SmartBalance.dto.TransactionCreateDto;
import com.SmartBalance.SmartBalance.dto.TransactionResponseDto;
import com.SmartBalance.SmartBalance.dto.TransactionUpdateDto;
import com.SmartBalance.SmartBalance.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity create(@RequestBody TransactionCreateDto dto){
        transactionService.create(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @ResponseBody
    public Page<TransactionResponseDto> readAll(Pageable pageable){

        return transactionService.read(pageable);
    }

    @PutMapping("/{id}")
    public ResponseEntity update (@PathVariable Long id, @RequestBody TransactionUpdateDto dto){

        transactionService.update(id, dto);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete (@PathVariable Long id){
        transactionService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sumValue")
    @ResponseBody
    public BigDecimal getValueSum(){
        return transactionService.getValueSum();
    }


}
