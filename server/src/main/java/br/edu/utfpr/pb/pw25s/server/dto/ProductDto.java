package br.edu.utfpr.pb.pw25s.server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {

    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    private String name;

    private String description;

    private BigDecimal price;

    private CategoryDto category;

}
