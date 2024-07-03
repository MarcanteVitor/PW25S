package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.OrderDto;
import br.edu.utfpr.pb.pw25s.server.model.Order;

import java.util.List;

public interface IOrderService extends ICrudService<Order, Long> {
    Order saveOrder(OrderDto orderDto, String username);
    List<Order> findByUser(String username);

}
