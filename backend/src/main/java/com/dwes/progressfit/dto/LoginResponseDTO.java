package com.dwes.progressfit.dto;

import com.dwes.progressfit.model.Rol;
import com.dwes.progressfit.model.Sexo;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class LoginResponseDTO {
    private Long idUsuario;
    private String nombre;
    private String email;
    private Double pesoCorporal;
    private Double altura;
    private LocalDate fechaNacimiento;
    private Sexo sexo;
    private Rol rol;
    private String token;
    private String avatar;
}