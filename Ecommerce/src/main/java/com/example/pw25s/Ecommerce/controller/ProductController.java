package com.example.pw25s.Ecommerce.controller;

import com.example.pw25s.Ecommerce.model.Product;
import com.example.pw25s.Ecommerce.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody @Valid Product product){
        productService.save(product);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(product.getId()).toUri();
        return ResponseEntity.created( location ).body(product);
    }

    @GetMapping("{id}")
    public ResponseEntity<Product> findOne(@PathVariable Long id) {
        Product product = productService.findOne(id);
        System.out.println(productService.findOne(id));
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
           return ResponseEntity.noContent().build();
        }
    }


    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }


}
