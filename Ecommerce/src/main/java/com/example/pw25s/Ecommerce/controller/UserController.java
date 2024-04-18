package com.example.pw25s.Ecommerce.controller;

import com.example.pw25s.Ecommerce.model.User;
import com.example.pw25s.Ecommerce.service.UserService;
import com.example.pw25s.Ecommerce.shared.GenericResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public GenericResponse createUser(@RequestBody User user) {
        userService.save(user);
        return GenericResponse.builder().message("User saved.").build();
    }


    @GetMapping("{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {
        //Product product = productService.findOne(id);
        System.out.println(userService.findOne(id));
//        if (product != null) {
//            return ResponseEntity.ok(product);
//        } else {
//            return ResponseEntity.noContent().build();
//        }
        return null;
    }


    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        System.out.println("aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

        return ResponseEntity.ok(userService.findAll());
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }



}