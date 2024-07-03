package br.edu.utfpr.pb.pw25s.server.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_order")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paymentMethod;

    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderProduct> items;

    @Column(precision = 10, scale = 2)
    private BigDecimal totalAmount;

    public void setItems(List<OrderProduct> items) {
        this.items = items;
        for (OrderProduct item : items) {
            item.setOrder(this);
        }
    }
}
