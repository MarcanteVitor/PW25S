package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.OrderDto;
import br.edu.utfpr.pb.pw25s.server.model.Order;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.security.SecurityConstants;
import br.edu.utfpr.pb.pw25s.server.service.AuthService;
import br.edu.utfpr.pb.pw25s.server.service.ICrudService;
import br.edu.utfpr.pb.pw25s.server.service.IOrderService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("orders")
public class OrderController extends CrudController<Order, OrderDto, Long> {

    private final IOrderService orderService;
    private final ModelMapper modelMapper;

    public OrderController(IOrderService orderService, ModelMapper modelMapper) {
        super(Order.class, OrderDto.class);
        this.orderService = orderService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Order, Long> getService() {
        return orderService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

    @Override
    @PostMapping
    public ResponseEntity<OrderDto> create(@RequestBody OrderDto orderDto) {
        Object username =  SecurityContextHolder.getContext().getAuthentication().getPrincipal() ;

        Order savedOrder = orderService.saveOrder(orderDto, username.toString());
        return ResponseEntity.ok(convertToDto(savedOrder));
    }
    @GetMapping("/user")
    public ResponseEntity<List<OrderDto>> findByUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails) principal).getUsername();

        List<Order> orders = orderService.findByUser(username);
        List<OrderDto> orderDtos = orders.stream()
                .map(order -> convertToDto(order))
                .collect(Collectors.toList());

        return ResponseEntity.ok(orderDtos);
    }


}
