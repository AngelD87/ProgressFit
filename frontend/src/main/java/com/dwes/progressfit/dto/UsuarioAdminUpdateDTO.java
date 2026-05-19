package com.dwes.progressfit.dto;

import com.dwes.progressfit.model.Rol;
import lombok.Data;

@Data
public class UsuarioAdminUpdateDTO {
    private Boolean isActive;
    private Rol rol;
}