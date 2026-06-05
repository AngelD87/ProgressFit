package com.dwes.progressfit.dto;

import com.dwes.progressfit.model.NivelActividad;
import com.dwes.progressfit.model.Sexo;
import lombok.Data;
import java.time.LocalDate;

@Data
public class UsuarioUpdateDTO {
    private String nombre;
    private String email;
    private String password;
    private Double pesoCorporal;
    private Double altura;
    private Double pesoObjetivo;
    private NivelActividad nivelActividad;
    private LocalDate fechaNacimiento;
    private Sexo sexo;
    private String avatar;
}