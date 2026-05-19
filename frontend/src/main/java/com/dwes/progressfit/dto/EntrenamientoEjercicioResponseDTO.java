package com.dwes.progressfit.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EntrenamientoEjercicioResponseDTO {
    private Long idEntrenamientoEjercicio;
    private Long idEntrenamiento;
    private Long idEjercicio;
    private String nombreEjercicio;
    private Integer orden;
    private String notas;
}