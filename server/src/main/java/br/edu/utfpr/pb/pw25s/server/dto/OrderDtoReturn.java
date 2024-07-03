package br.edu.utfpr.pb.pw25s.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDtoReturn {

    private Long id;

    private String paymentMethod;

    private LocalDateTime date;
}
