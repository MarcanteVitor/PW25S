package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.OrderProduct;
import br.edu.utfpr.pb.pw25s.server.repository.OrderProductRepository;
import br.edu.utfpr.pb.pw25s.server.service.IOrderProductService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderProductServiceImpl extends CrudServiceImpl<OrderProduct, Long>
        implements IOrderProductService {

    private final OrderProductRepository orderProductRepository;

    public OrderProductServiceImpl(OrderProductRepository orderProductRepository) {
        this.orderProductRepository = orderProductRepository;
    }

    @Override
    protected JpaRepository<OrderProduct, Long> getRepository() {
        return orderProductRepository;
    }

}