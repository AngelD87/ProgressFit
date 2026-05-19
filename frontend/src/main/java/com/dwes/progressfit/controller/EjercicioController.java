package com.dwes.progressfit.controller;

import com.dwes.progressfit.dto.EjercicioCreateDTO;
import com.dwes.progressfit.dto.EjercicioResponseDTO;
import com.dwes.progressfit.dto.EjercicioUpdateDTO;
import com.dwes.progressfit.service.EjercicioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ejercicios")
public class EjercicioController {

    private final EjercicioService ejercicioService;

    public EjercicioController(EjercicioService ejercicioService) {
        this.ejercicioService = ejercicioService;
    }

    @PostMapping
    public ResponseEntity<EjercicioResponseDTO> crear(@RequestBody EjercicioCreateDTO dto) {
        return ResponseEntity.ok(ejercicioService.crearDesdeDTO(dto));
    }

    @GetMapping
    public ResponseEntity<List<EjercicioResponseDTO>> listar() {
        return ResponseEntity.ok(ejercicioService.listarDTO());
    }

    @GetMapping("/musculo/{idMusculo}")
    public ResponseEntity<List<EjercicioResponseDTO>> listarPorMusculo(
            @PathVariable Long idMusculo) {
        return ResponseEntity.ok(ejercicioService.listarPorMusculoDTO(idMusculo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EjercicioResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ejercicioService.buscarPorIdDTO(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EjercicioResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody EjercicioUpdateDTO dto) {
        return ResponseEntity.ok(ejercicioService.actualizarDesdeDTO(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        ejercicioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}