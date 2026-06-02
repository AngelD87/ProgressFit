package com.dwes.progressfit.controller;

import com.dwes.progressfit.dto.RegistroPesoCreateDTO;
import com.dwes.progressfit.dto.RegistroPesoResponseDTO;
import com.dwes.progressfit.service.RegistroPesoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/registros-peso")
public class RegistroPesoController {

    private final RegistroPesoService registroPesoService;

    public RegistroPesoController(RegistroPesoService registroPesoService) {
        this.registroPesoService = registroPesoService;
    }

    //GUARDAR EL PESO DE HOY
    @PostMapping
    public ResponseEntity<RegistroPesoResponseDTO> guardar(
            @RequestBody RegistroPesoCreateDTO dto) {
        return ResponseEntity.ok(registroPesoService.guardarPeso(dto));
    }

    //HISTORIAL DE PESO DE UN USUARIO
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<RegistroPesoResponseDTO>> listarPorUsuario(
            @PathVariable Long idUsuario) {
        return ResponseEntity.ok(registroPesoService.listarPorUsuario(idUsuario));
    }
}