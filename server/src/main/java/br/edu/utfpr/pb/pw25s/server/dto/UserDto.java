package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.annotation.UniqueUsername;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserDto {
    private Long id;

    @UniqueUsername
    @NotNull(message = "{br.edu.pb.utfpr.pw25s.server.user.username.NotNull}")
    @Size(min = 4, max = 255)
    private String username;

    @NotNull
    @Size(min = 4, max = 255)
    private String displayName;

    @NotNull
    @Size(min = 6)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
            message = "{br.edu.pb.utfpr.pw25s.server.user.password.Pattern}")
    private String password;
}
