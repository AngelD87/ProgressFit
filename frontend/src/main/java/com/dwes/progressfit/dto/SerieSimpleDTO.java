package com.dwes.progressfit.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SerieSimpleDTO {
    private Long idSerie;
    private Integer numeroSerie;
    private Integer repeticiones;
    private Double peso;
    private Integer rir;
}