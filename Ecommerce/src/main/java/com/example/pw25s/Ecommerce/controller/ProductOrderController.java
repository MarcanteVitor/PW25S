package com.example.pw25s.Ecommerce.controller;

import com.example.pw25s.Ecommerce.model.ProductOrder;
import com.example.pw25s.Ecommerce.service.ProductOrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("product-orders")
public class ProductOrderController {
    private final ProductOrderService productOrderService;
    public ProductOrderController(ProductOrderService productOrderService) {
        this.productOrderService = productOrderService;
    }
    @PostMapping
    public ResponseEntity<ProductOrder> create(
            @RequestBody @Valid ProductOrder productOrder) {
        productOrderService.save(productOrder);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(productOrder.getId()).toUri();
        return ResponseEntity.created( location ).body(productOrder);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {
        ProductOrder productOrder = productOrderService.findOne(id);
        if (productOrder != null) {
            return ResponseEntity.ok(productOrder);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductOrder>> findAll() {
        return ResponseEntity.ok(productOrderService.findAll());
    }
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        productOrderService.delete(id);
    }
}
