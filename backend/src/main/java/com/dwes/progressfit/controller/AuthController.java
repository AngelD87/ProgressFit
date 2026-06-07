package com.dwes.progressfit.controller;

import com.dwes.progressfit.dto.LoginRequestDTO;
import com.dwes.progressfit.dto.LoginResponseDTO;
import com.dwes.progressfit.dto.VerificarIdentidadDTO;
import com.dwes.progressfit.dto.RecuperarPasswordDTO;
import com.dwes.progressfit.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    //PASO 1: VERIFICAR IDENTIDAD (EMAIL + FECHA DE NACIMIENTO)
    @PostMapping("/verificar-identidad")
    public ResponseEntity<Void> verificarIdentidad(@RequestBody VerificarIdentidadDTO dto) {
        authService.verificarIdentidad(dto);
        return ResponseEntity.ok().build();
    }

    //PASO 2: CAMBIAR LA CONTRASEÑA
    @PostMapping("/recuperar-password")
    public ResponseEntity<Void> recuperarPassword(@RequestBody RecuperarPasswordDTO dto) {
        authService.recuperarPassword(dto);
        return ResponseEntity.ok().build();
    }
}