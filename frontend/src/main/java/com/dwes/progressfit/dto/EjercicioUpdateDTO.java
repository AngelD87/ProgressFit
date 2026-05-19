package com.dwes.progressfit.dto;

import com.dwes.progressfit.model.Dificultad;
import lombok.Data;

@Data
public class EjercicioUpdateDTO {
    private String nombre;
    private String descripcion;
    private String videoUrl;
    private Dificultad dificultad;
    private Boolean activo;
    private Long idMusculo;
}