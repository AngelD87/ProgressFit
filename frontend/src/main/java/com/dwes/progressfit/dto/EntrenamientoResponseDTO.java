package com.dwes.progressfit.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class EntrenamientoResponseDTO {
    private Long idEntrenamiento;
    private Long idUsuario;
    private String nombre;
    private LocalDateTime inicio;
    private LocalDateTime fin;
    private Integer valoracion;
    private String comentario;
}