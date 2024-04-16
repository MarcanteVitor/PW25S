package com.example.pw25s.Ecommerce.controller;

import com.example.pw25s.Ecommerce.model.User;
import com.example.pw25s.Ecommerce.service.UserService;
import com.example.pw25s.Ecommerce.shared.GenericResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return GenericResponse.builder().message("User saved.").build();
    }

}