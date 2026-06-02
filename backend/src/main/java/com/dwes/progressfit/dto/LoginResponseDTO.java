package com.dwes.progressfit.dto;

import com.dwes.progressfit.model.Rol;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDTO {
    private Long idUsuario;
    private String nombre;
    private String email;
    private Double pesoCorporal;
    private Double altura;
    private Rol rol;
    private String token;
    private String avatar;
}