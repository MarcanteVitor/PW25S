package com.example.pw25s.Ecommerce.annotation;

import com.example.pw25s.Ecommerce.model.User;
import com.example.pw25s.Ecommerce.validation.UniqueUsernameValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniqueUsernameValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUsername {

    String message() default "{br.edu.pb.utfpr.pw25s.Ecommerce.model.user.username.Unique}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
