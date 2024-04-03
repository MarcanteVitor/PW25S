package com.example.pw25s.Ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name="tb_product")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name="category_id")
    private br.edu.utfpr.pb.pw25s.server.model.Category category;
}
