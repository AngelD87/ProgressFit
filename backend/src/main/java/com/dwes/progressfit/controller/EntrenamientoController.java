package com.dwes.progressfit.controller;

import com.dwes.progressfit.dto.EntrenamientoCerrarDTO;
import com.dwes.progressfit.dto.EntrenamientoCompletoDTO;
import com.dwes.progressfit.dto.EntrenamientoCreateDTO;
import com.dwes.progressfit.dto.EntrenamientoResponseDTO;
import com.dwes.progressfit.service.EntrenamientoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/entrenamientos")
public class EntrenamientoController {

    private final EntrenamientoService entrenamientoService;

    public EntrenamientoController(EntrenamientoService entrenamientoService) {
        this.entrenamientoService = entrenamientoService;
    }

    @PostMapping
    public ResponseEntity<EntrenamientoResponseDTO> crear(
            @RequestBody EntrenamientoCreateDTO dto) {
        return ResponseEntity.ok(entrenamientoService.crearEntrenamientoDTO(dto));
    }

    @GetMapping
    public ResponseEntity<List<EntrenamientoResponseDTO>> listar() {
        return ResponseEntity.ok(entrenamientoService.listarDTO());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntrenamientoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(entrenamientoService.buscarPorIdDTO(id));
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<EntrenamientoResponseDTO>> listarPorUsuario(
            @PathVariable Long idUsuario) {
        return ResponseEntity.ok(entrenamientoService.listarPorUsuarioDTO(idUsuario));
    }

    @PutMapping("/{id}/cerrar")
    public ResponseEntity<EntrenamientoResponseDTO> cerrar(
            @PathVariable Long id,
            @RequestBody EntrenamientoCerrarDTO dto) {
        return ResponseEntity.ok(entrenamientoService.cerrarEntrenamientoDesdeDTO(id, dto));
    }

    @GetMapping("/{id}/completo")
    public ResponseEntity<EntrenamientoCompletoDTO> obtenerCompleto(@PathVariable Long id) {
        return ResponseEntity.ok(entrenamientoService.obtenerEntrenamientoCompleto(id));
    }

    @PutMapping("/{id}/valorar")
    public ResponseEntity<EntrenamientoResponseDTO> valorar(
            @PathVariable Long id,
            @RequestBody EntrenamientoCerrarDTO dto) {
        return ResponseEntity.ok(entrenamientoService.valorarEntrenamiento(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        entrenamientoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{idUsuario}/completos")
    public ResponseEntity<List<EntrenamientoCompletoDTO>> listarCompletoPorUsuario(
            @PathVariable Long idUsuario) {
        return ResponseEntity.ok(entrenamientoService.listarCompletoPorUsuario(idUsuario));
    }


}