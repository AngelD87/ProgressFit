package com.dwes.progressfit.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SerieResponseDTO {
    private Long idSerie;
    private Long idEntrenamientoEjercicio;
    private Integer numeroSerie;
    private Integer repeticiones;
    private Double peso;
    private Integer rir;
}