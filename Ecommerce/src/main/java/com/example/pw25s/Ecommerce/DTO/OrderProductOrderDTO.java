package com.example.pw25s.Ecommerce.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class OrderProductOrderDTO {
    private Date data;
    private Long user_id;
    private List<ProdutoDTO> products;
}
