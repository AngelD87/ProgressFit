package com.dwes.progressfit.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class VerificarIdentidadDTO {
    private String email;
    private LocalDate fechaNacimiento;
}