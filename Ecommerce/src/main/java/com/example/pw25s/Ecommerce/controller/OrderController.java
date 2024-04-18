package com.example.pw25s.Ecommerce.controller;

import com.example.pw25s.Ecommerce.model.Order;
import com.example.pw25s.Ecommerce.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("orders")
public class OrderController {
    private OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody @Valid Order order) {
        orderService.save(order);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(order.getId()).toUri();
        return ResponseEntity.created( location ).body(order);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {

        System.out.println(orderService.findOne(id));
        return null;
    }
    @GetMapping
    public ResponseEntity<List<Order>> findAll() {
        System.out.println("aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

        return ResponseEntity.ok(orderService.findAll());
    }
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        orderService.delete(id);
    }

}
