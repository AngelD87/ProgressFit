package com.dwes.progressfit.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "musculos")
@Data
public class Musculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_musculo")
    private Long idMusculo;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;
}