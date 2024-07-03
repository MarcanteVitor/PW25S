package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.CategoryDto;
import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.service.ICategoryService;
import br.edu.utfpr.pb.pw25s.server.service.ICrudService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("categories")
public class CategoryController extends CrudController<Category, CategoryDto, Long>{

    private final ICategoryService service;
    private final ModelMapper modelMapper;

    public CategoryController(ICategoryService service, ModelMapper modelMapper) {
        super(Category.class, CategoryDto.class);
        this.service = service;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Category, Long> getService() {
        return service;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}