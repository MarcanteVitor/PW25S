package com.example.pw25s.Ecommerce.service;

import com.example.pw25s.Ecommerce.model.ProductOrder;
import com.example.pw25s.Ecommerce.repository.ProductOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductOrderService {

    private final ProductOrderRepository productOrderRepository;

    public ProductOrderService(ProductOrderRepository productOrderRepository) {
        this.productOrderRepository = productOrderRepository;
    }

    public ProductOrder save(ProductOrder productOrder) {
        return productOrderRepository.save(productOrder);
    }

    public ProductOrder findOne(Long id) {
        return productOrderRepository.findById(id).orElse(null);
    }

//    public List<ProductOrder> getProductOrdersByOrderId(Long id) {
//        return productOrderRepository.findByOrderId(id);
//    }

    public List<ProductOrder> findAll() {
        return productOrderRepository.findAll();
    }

    public void delete(Long id) {
        productOrderRepository.deleteById(id);
    }
}
