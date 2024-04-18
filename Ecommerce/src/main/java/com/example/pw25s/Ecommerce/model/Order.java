package com.example.pw25s.Ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Table(name="tb_order")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date data;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
