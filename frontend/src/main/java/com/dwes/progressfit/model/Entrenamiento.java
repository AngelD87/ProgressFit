package com.dwes.progressfit.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "entrenamientos")
@Data
public class Entrenamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_entrenamiento")
    private Long idEntrenamiento;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false)
    private LocalDateTime inicio;

    private LocalDateTime fin;

    private Integer valoracion;

    @Column(columnDefinition = "TEXT")
    private String comentario;

    @OneToMany(
            mappedBy = "entrenamiento",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<EntrenamientoEjercicio> ejercicios;
}