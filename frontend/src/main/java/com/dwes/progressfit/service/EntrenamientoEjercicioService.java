package com.dwes.progressfit.service;

import com.dwes.progressfit.dto.EntrenamientoEjercicioCreateDTO;
import com.dwes.progressfit.dto.EntrenamientoEjercicioResponseDTO;
import com.dwes.progressfit.dto.EntrenamientoEjercicioUpdateDTO;
import com.dwes.progressfit.model.Ejercicio;
import com.dwes.progressfit.model.Entrenamiento;
import com.dwes.progressfit.model.EntrenamientoEjercicio;
import com.dwes.progressfit.repository.EjercicioRepository;
import com.dwes.progressfit.repository.EntrenamientoEjercicioRepository;
import com.dwes.progressfit.repository.EntrenamientoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EntrenamientoEjercicioService {

    private final EntrenamientoEjercicioRepository entrenamientoEjercicioRepository;
    private final EntrenamientoRepository entrenamientoRepository;
    private final EjercicioRepository ejercicioRepository;

    public EntrenamientoEjercicioService(
            EntrenamientoEjercicioRepository entrenamientoEjercicioRepository,
            EntrenamientoRepository entrenamientoRepository,
            EjercicioRepository ejercicioRepository) {
        this.entrenamientoEjercicioRepository = entrenamientoEjercicioRepository;
        this.entrenamientoRepository = entrenamientoRepository;
        this.ejercicioRepository = ejercicioRepository;
    }

    private EntrenamientoEjercicioResponseDTO toResponseDTO(EntrenamientoEjercicio ee) {
        return EntrenamientoEjercicioResponseDTO.builder()
                .idEntrenamientoEjercicio(ee.getIdEntrenamientoEjercicio())
                .idEntrenamiento(ee.getEntrenamiento().getIdEntrenamiento())
                .idEjercicio(ee.getEjercicio().getIdEjercicio())
                .nombreEjercicio(ee.getEjercicio().getNombre())
                .orden(ee.getOrden())
                .notas(ee.getNotas())
                .build();
    }

    public EntrenamientoEjercicioResponseDTO añadirEjercicioDTO(
            EntrenamientoEjercicioCreateDTO dto) {
        Entrenamiento entrenamiento = entrenamientoRepository.findById(dto.getIdEntrenamiento())
                .orElseThrow(() ->
                        new IllegalArgumentException("El entrenamiento no existe"));
        Ejercicio ejercicio = ejercicioRepository.findById(dto.getIdEjercicio())
                .orElseThrow(() ->
                        new IllegalArgumentException("El ejercicio no existe"));
        if (entrenamiento.getFin() != null) {
            throw new IllegalStateException("No se pueden añadir ejercicios a un entrenamiento cerrado");
        }
        if (dto.getOrden() == null || dto.getOrden() <= 0) {
            throw new IllegalArgumentException("El orden debe ser mayor que 0");
        }
        boolean existeOrden =
                entrenamientoEjercicioRepository.existsByEntrenamientoIdEntrenamientoAndOrden(
                        dto.getIdEntrenamiento(), dto.getOrden());
        if (existeOrden) {
            throw new IllegalArgumentException("Ya existe un ejercicio con ese orden en este entrenamiento");
        }
        EntrenamientoEjercicio ee = new EntrenamientoEjercicio();
        ee.setEntrenamiento(entrenamiento);
        ee.setEjercicio(ejercicio);
        ee.setOrden(dto.getOrden());
        ee.setNotas(dto.getNotas());
        EntrenamientoEjercicio guardado = entrenamientoEjercicioRepository.save(ee);
        return toResponseDTO(guardado);
    }

    public List<EntrenamientoEjercicioResponseDTO> listarPorEntrenamientoDTO(Long idEntrenamiento) {
        return entrenamientoEjercicioRepository
                .findByEntrenamientoIdEntrenamientoOrderByOrden(idEntrenamiento)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public EntrenamientoEjercicioResponseDTO buscarPorIdDTO(Long id) {
        EntrenamientoEjercicio ee = entrenamientoEjercicioRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("El ejercicio del entrenamiento no existe"));
        return toResponseDTO(ee);
    }

    public EntrenamientoEjercicioResponseDTO actualizarDTO(
            Long id, EntrenamientoEjercicioUpdateDTO dto) {
        EntrenamientoEjercicio ee = entrenamientoEjercicioRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("El ejercicio del entrenamiento no existe"));
        if (ee.getEntrenamiento().getFin() != null) {
            throw new IllegalStateException("No se puede actualizar un ejercicio de un entrenamiento cerrado");
        }
        if (dto.getOrden() != null && dto.getOrden() <= 0) {
            throw new IllegalArgumentException("El orden debe ser mayor que 0");
        }
        if (dto.getOrden() != null) {
            boolean cambiaOrden = !dto.getOrden().equals(ee.getOrden());
            if (cambiaOrden) {
                boolean existeOrden = entrenamientoEjercicioRepository
                        .existsByEntrenamientoIdEntrenamientoAndOrden(
                                ee.getEntrenamiento().getIdEntrenamiento(),
                                dto.getOrden());
                if (existeOrden) {
                    throw new IllegalArgumentException("Ya existe un ejercicio con ese orden en este entrenamiento");
                }
            }
            ee.setOrden(dto.getOrden());
        }
        if (dto.getNotas() != null) {
            ee.setNotas(dto.getNotas());
        }
        EntrenamientoEjercicio actualizado = entrenamientoEjercicioRepository.save(ee);
        return toResponseDTO(actualizado);
    }

    public void eliminar(Long id) {
        EntrenamientoEjercicio ee = entrenamientoEjercicioRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("El ejercicio que intentas eliminar no existe"));
        if (ee.getEntrenamiento().getFin() != null) {
            throw new IllegalStateException("No se pueden eliminar ejercicios de un entrenamiento cerrado");
        }
        entrenamientoEjercicioRepository.delete(ee);
    }
}