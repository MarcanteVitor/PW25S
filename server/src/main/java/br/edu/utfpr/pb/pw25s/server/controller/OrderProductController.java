package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.OrderDto;
import br.edu.utfpr.pb.pw25s.server.dto.OrderProductDto;
import br.edu.utfpr.pb.pw25s.server.model.Order;
import br.edu.utfpr.pb.pw25s.server.model.OrderProduct;
import br.edu.utfpr.pb.pw25s.server.service.ICrudService;
import br.edu.utfpr.pb.pw25s.server.service.IOrderProductService;
import br.edu.utfpr.pb.pw25s.server.service.IOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("orders-products")
public class OrderProductController extends CrudController<OrderProduct, OrderProductDto, Long>{

    private final IOrderProductService service;
    private final ModelMapper modelMapper;

    public OrderProductController(IOrderProductService service, ModelMapper modelMapper) {
        super(OrderProduct.class, OrderProductDto.class);
        this.service = service;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<OrderProduct, Long> getService() {
        return service;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}