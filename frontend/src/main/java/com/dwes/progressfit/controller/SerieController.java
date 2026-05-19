package com.dwes.progressfit.controller;

import com.dwes.progressfit.dto.SerieCreateDTO;
import com.dwes.progressfit.dto.SerieResponseDTO;
import com.dwes.progressfit.dto.SerieUpdateDTO;
import com.dwes.progressfit.service.SerieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/series")
public class SerieController {

    private final SerieService serieService;

    public SerieController(SerieService serieService) {
        this.serieService = serieService;
    }

    @PostMapping
    public ResponseEntity<SerieResponseDTO> crear(@RequestBody SerieCreateDTO dto) {
        return ResponseEntity.ok(serieService.añadirSerieDTO(dto));
    }

    @GetMapping("/entrenamiento-ejercicio/{idEntrenamientoEjercicio}")
    public ResponseEntity<List<SerieResponseDTO>> listarPorEjercicio(
            @PathVariable Long idEntrenamientoEjercicio) {
        return ResponseEntity.ok(
                serieService.listarPorEntrenamientoEjercicioDTO(idEntrenamientoEjercicio));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SerieResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(serieService.buscarPorIdDTO(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SerieResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody SerieUpdateDTO dto) {
        return ResponseEntity.ok(serieService.actualizarDTO(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        serieService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}