package com.dwes.progressfit.dto;

import lombok.Data;

@Data
public class SerieCreateDTO {
    private Long idEntrenamientoEjercicio;
    private Integer numeroSerie;
    private Integer repeticiones;
    private Double peso;
    private Integer rir;
}