package com.dwes.progressfit.controller;

import com.dwes.progressfit.dto.UsuarioAdminUpdateDTO;
import com.dwes.progressfit.dto.UsuarioResponseDTO;
import com.dwes.progressfit.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/usuarios")
public class AdminUsuarioController {

    private final UsuarioService usuarioService;

    public AdminUsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> actualizarComoAdmin(
            @PathVariable Long id,
            @RequestBody UsuarioAdminUpdateDTO dto) {
        return ResponseEntity.ok(usuarioService.actualizarComoAdmin(id, dto));
    }
}