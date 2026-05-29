package com.dwes.progressfit.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class EntrenamientoEjercicioCompletoDTO {
    private Long idEntrenamientoEjercicio;
    private Long idEjercicio;
    private String nombreEjercicio;
    private Long idMusculo;
    private String nombreMusculo;
    private Integer orden;
    private String notas;
    private List<SerieSimpleDTO> series;
}