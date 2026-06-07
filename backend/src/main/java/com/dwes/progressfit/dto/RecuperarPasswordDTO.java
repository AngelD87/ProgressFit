package com.dwes.progressfit.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RecuperarPasswordDTO {
    private String email;
    private LocalDate fechaNacimiento;
    private String nuevaPassword;
}