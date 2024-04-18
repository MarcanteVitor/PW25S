package com.example.pw25s.Ecommerce.controller;
import com.example.pw25s.Ecommerce.model.User;
import com.example.pw25s.Ecommerce.security.dto.UserResponseDTO;
import com.example.pw25s.Ecommerce.service.UserService;
import com.example.pw25s.Ecommerce.shared.GenericResponse;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
//public class UserController {
//
//    private final UserService userService;
//
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @PostMapping
//    public GenericResponse createUser(@RequestBody User user) {
//        userService.save(user);
//        return GenericResponse.builder().message("User saved.").build();
//    }
//
//    @GetMapping("{id}")
//    public ResponseEntity<?> findOne(@PathVariable Long id) {
//        System.out.println(userService.findOne(id));
//        return null;
//    }
//
//    @GetMapping
//    public ResponseEntity<List<User>> findAll() {
//        return ResponseEntity.ok(userService.findAll());
//    }
//
//    @DeleteMapping("{id}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void delete(@PathVariable Long id) {
//        userService.delete(id);
//    }
//
//}

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