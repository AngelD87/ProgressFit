package com.dwes.progressfit.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "peso_corporal")
    private Double pesoCorporal;

    @Column
    private Double altura;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    @Column(name = "is_active")
    private Boolean isActive;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Rol rol;

    @Column(length = 50)
    private String avatar;
}