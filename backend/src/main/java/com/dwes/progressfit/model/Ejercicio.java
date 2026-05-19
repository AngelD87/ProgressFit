package com.dwes.progressfit.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ejercicios")
@Data
public class Ejercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ejercicio")
    private Long idEjercicio;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "video_url", length = 255)
    private String videoUrl;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Dificultad dificultad;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean activo;

    @ManyToOne
    @JoinColumn(name = "id_musculo", nullable = false)
    private Musculo musculo;
}