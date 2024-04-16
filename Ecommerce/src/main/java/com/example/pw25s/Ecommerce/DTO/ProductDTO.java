package com.example.pw25s.Ecommerce.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String category_name;

}
