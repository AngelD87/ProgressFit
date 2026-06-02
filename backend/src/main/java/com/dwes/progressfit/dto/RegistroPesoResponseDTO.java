package com.dwes.progressfit.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class RegistroPesoResponseDTO {
    private Long idRegistroPeso;
    private Double peso;
    private LocalDate fecha;

}