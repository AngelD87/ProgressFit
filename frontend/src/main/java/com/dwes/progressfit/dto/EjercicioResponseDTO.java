package com.dwes.progressfit.dto;

import com.dwes.progressfit.model.Dificultad;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EjercicioResponseDTO {
    private Long idEjercicio;
    private String nombre;
    private String descripcion;
    private String videoUrl;
    private Dificultad dificultad;
    private Boolean activo;
    private Long idMusculo;
    private String nombreMusculo;
}