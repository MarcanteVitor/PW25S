package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.dto.OrderDto;
import br.edu.utfpr.pb.pw25s.server.model.Order;
import br.edu.utfpr.pb.pw25s.server.model.OrderProduct;
import br.edu.utfpr.pb.pw25s.server.model.Product;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.OrderRepository;
import br.edu.utfpr.pb.pw25s.server.repository.ProductRepository;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.service.IOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl extends CrudServiceImpl<Order, Long> implements IOrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    protected JpaRepository<Order, Long> getRepository() {
        return orderRepository;
    }

    @Override
    public List<Order> findByUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found: " + username);
        }
        return orderRepository.findByUser(user);
    }
    @Override
    @Transactional
    public Order saveOrder(OrderDto orderDto, String username) {
        Order order = new Order();
        order.setPaymentMethod(orderDto.getFormaPagamento());
        order.setDate(LocalDateTime.now());

        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found: " + username);
        }
        order.setUser(user);

        List<OrderProduct> orderProducts = orderDto.getProducts().stream().map(itemDto -> {
            OrderProduct orderProduct = modelMapper.map(itemDto, OrderProduct.class);
            orderProduct.setOrder(order);

            Product product = productRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            orderProduct.setProduct(product);

            BigDecimal price = product.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantidade()));
            orderProduct.setPrice(price);

            orderProduct.setQuantity(itemDto.getQuantidade());

            return orderProduct;
        }).collect(Collectors.toList());

        order.setItems(orderProducts);

        BigDecimal totalAmount = orderProducts.stream()
                .map(OrderProduct::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(totalAmount);

        return orderRepository.save(order);
    }
}