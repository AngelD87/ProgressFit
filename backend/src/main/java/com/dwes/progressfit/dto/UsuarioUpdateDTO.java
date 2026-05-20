package com.dwes.progressfit.dto;

import lombok.Data;

@Data
public class UsuarioUpdateDTO {
    private String nombre;
    private String email;
    private String password;
    private Double pesoCorporal;
    private Double altura;
    private String avatar;

}