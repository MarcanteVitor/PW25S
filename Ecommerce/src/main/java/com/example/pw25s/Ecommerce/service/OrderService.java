package com.example.pw25s.Ecommerce.service;

import com.example.pw25s.Ecommerce.model.Category;
import com.example.pw25s.Ecommerce.model.Order;

import com.example.pw25s.Ecommerce.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public Order findOne(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public void delete(Long id) {
        orderRepository.deleteById(id);
    }
}
