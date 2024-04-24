package com.example.pw25s.Ecommerce.controller;

import com.example.pw25s.Ecommerce.DTO.OrderProductOrderDTO;
import com.example.pw25s.Ecommerce.DTO.ProdutoDTO;
import com.example.pw25s.Ecommerce.model.Order;
import com.example.pw25s.Ecommerce.model.Product;
import com.example.pw25s.Ecommerce.model.ProductOrder;
import com.example.pw25s.Ecommerce.model.User;
import com.example.pw25s.Ecommerce.service.OrderService;
import com.example.pw25s.Ecommerce.service.ProductOrderService;
import com.example.pw25s.Ecommerce.service.ProductService;
import com.example.pw25s.Ecommerce.service.UserService;
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
    private final UserService userService;
    private final OrderService orderService;

    private final ProductService productService;

    public ProductOrderController(ProductOrderService productOrderService, UserService userService, OrderService orderService, ProductService productService) {
        this.productOrderService = productOrderService;
        this.userService = userService;
        this.orderService = orderService;
        this.productService = productService;
    }
    @PostMapping
    public String create(@RequestBody OrderProductOrderDTO body) {

        String productOrderReturn = null;

        User user = userService.findOne(body.getUser_id());

        Order order = new Order();
        order.setData(body.getData());
        order.setUser(user);
        order = orderService.save(order);

        productOrderReturn = "Pedido " + order.getId() + " criado com sucesso. \nProdutos:\n";

        for (ProdutoDTO produtoDTO : body.getProducts()){
            ProductOrder po = new ProductOrder();
            po.setOrder(order);
            po.setPrice(produtoDTO.getPrice());
            po.setQuantity(produtoDTO.getQuantity());

            Product product = productService.findOne(produtoDTO.getProduct_id());
            productOrderReturn += "Produto: " + product.getName() + " Quantidade: " + produtoDTO.getQuantity() + " preço: " + produtoDTO.getPrice() + "\n";
            po.setProduct(product);

            po = productOrderService.save(po);

        }

        return productOrderReturn;
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
    public ResponseEntity<List<ProductOrder>> findAllByPedido(@PathVariable Long id) {
        return ResponseEntity.ok(productOrderService.findAll());
    }

//    @GetMapping("/order/{id}")
//    public List<ProductOrder> getProductOrdersByOrderId(Long orderId) {
//        return productOrderService.getProductOrdersByOrderId(orderId);
//    }
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        productOrderService.delete(id);
    }
}
