package com.dwes.progressfit.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "entrenamiento_ejercicios")
@Data
public class EntrenamientoEjercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_entrenamiento_ejercicio")
    private Long idEntrenamientoEjercicio;

    @ManyToOne
    @JoinColumn(name = "id_entrenamiento", nullable = false)
    private Entrenamiento entrenamiento;

    @ManyToOne
    @JoinColumn(name = "id_ejercicio", nullable = false)
    private Ejercicio ejercicio;

    @Column(nullable = false)
    private Integer orden;

    @Column(columnDefinition = "TEXT")
    private String notas;

    @OneToMany(
            mappedBy = "entrenamientoEjercicio",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Serie> series;
}