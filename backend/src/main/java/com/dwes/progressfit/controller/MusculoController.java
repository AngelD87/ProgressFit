package com.dwes.progressfit.controller;

import com.dwes.progressfit.dto.MusculoCreateDTO;
import com.dwes.progressfit.dto.MusculoResponseDTO;
import com.dwes.progressfit.dto.MusculoUpdateDTO;
import com.dwes.progressfit.service.MusculoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/musculos")
public class MusculoController {

    private final MusculoService musculoService;

    public MusculoController(MusculoService musculoService) {
        this.musculoService = musculoService;
    }

    @PostMapping
    public ResponseEntity<MusculoResponseDTO> crear(@RequestBody MusculoCreateDTO dto) {
        return ResponseEntity.ok(musculoService.crearDesdeDTO(dto));
    }

    @GetMapping
    public ResponseEntity<List<MusculoResponseDTO>> listar() {
        return ResponseEntity.ok(musculoService.listarDTO());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MusculoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(musculoService.buscarPorIdDTO(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MusculoResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody MusculoUpdateDTO dto) {
        return ResponseEntity.ok(musculoService.actualizarDesdeDTO(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        musculoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}