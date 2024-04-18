package com.example.pw25s.Ecommerce.validation;

import com.example.pw25s.Ecommerce.annotation.UniqueUsername;
import com.example.pw25s.Ecommerce.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {


        if (userRepository.findByUsername(s) == null) {
            return true;
        }
        return false;
    }
}