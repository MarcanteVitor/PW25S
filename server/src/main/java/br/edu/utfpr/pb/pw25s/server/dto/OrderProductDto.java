package br.edu.utfpr.pb.pw25s.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

//ItensDoPedido = {pedidoProdutosId: Long, pedidoId: Long, produtoId: Long,
//preço: BigDecimal, quantidade: Integer}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderProductDto {

    private Long id;

    private Long produtoId;

    private int quantidade;
}