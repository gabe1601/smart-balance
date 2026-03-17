package com.SmartBalance.SmartBalance.service;

import com.SmartBalance.SmartBalance.dto.TransactionCreateDto;
import com.SmartBalance.SmartBalance.dto.TransactionResponseDto;
import com.SmartBalance.SmartBalance.dto.TransactionUpdateDto;
import com.SmartBalance.SmartBalance.model.Transaction;
import com.SmartBalance.SmartBalance.repository.TransactionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public void create(TransactionCreateDto dto){
        Transaction transaction = dto.toEntity();
        repository.save(transaction);
    }

    public Page<TransactionResponseDto> read(Pageable pageable){
        Page<Transaction> page = repository.findAll(pageable);
        return page.map((TransactionResponseDto::fromEntity));
    }

    public void update (Long id, TransactionUpdateDto dto){

        Transaction transaction = repository.findById(id).orElseThrow(()-> new RuntimeException("Id não existe!"));
        if(dto.getDescription() != null){
            transaction.setDescription(dto.getDescription());
        }
        if(dto.getType() != null){
            transaction.setType(dto.getType());
        }
        if (dto.getQuantity() != null){
            transaction.setQuantity(Long.valueOf(dto.getQuantity()));
        }
        if(dto.getBuyer() != null){
            transaction.setBuyer(dto.getBuyer());
        }
        if(dto.getValue() != null){
            transaction.setValue(dto.getValue());
        }

        repository.save(transaction);
    }

    //Delete
    public void delete (Long id){
        repository.deleteById(id);
    }
}
