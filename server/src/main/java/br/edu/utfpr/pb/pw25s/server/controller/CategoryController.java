package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.CategoryDto;
import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.service.ICategoryService;
import br.edu.utfpr.pb.pw25s.server.service.ICrudService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

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
//
//    private final ICategoryService categoryService;
//
//    public CategoryController(ICategoryService categoryService) {
//        this.categoryService = categoryService;
//    }
//
//    @PostMapping
//    public ResponseEntity<Category> create(
//            @RequestBody @Valid Category category) {
//        categoryService.save(category);
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(category.getId()).toUri();
//        return ResponseEntity.created( location ).body(category);
//    }
//
//    // http://localhost:8025/categories/1
//    @GetMapping("{id}")
//    public ResponseEntity<?> findOne(@PathVariable Long id) {
//        Category category = categoryService.findOne(id);
//        if (category != null) {
//            return ResponseEntity.ok(category);
//        } else {
//            return ResponseEntity.noContent().build();
//        }
//    }
//
//    // http://localhost:8025/categories
//    @GetMapping
//    public ResponseEntity<List<Category>> findAll() {
//        return ResponseEntity.ok(categoryService.findAll());
//    }
//
//    @DeleteMapping("{id}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void delete(@PathVariable Long id) {
//        categoryService.delete(id);
//    }
//
//}
