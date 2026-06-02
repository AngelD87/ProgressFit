package com.dwes.progressfit.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "registros_peso")
public class RegistroPeso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRegistroPeso;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private Double peso;

    @Column(nullable = false)
    private LocalDate fecha;

}
