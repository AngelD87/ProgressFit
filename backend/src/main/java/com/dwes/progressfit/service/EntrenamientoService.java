package com.dwes.progressfit.service;

import com.dwes.progressfit.dto.*;
import com.dwes.progressfit.model.Entrenamiento;
import com.dwes.progressfit.model.EntrenamientoEjercicio;
import com.dwes.progressfit.model.Usuario;
import com.dwes.progressfit.repository.EntrenamientoEjercicioRepository;
import com.dwes.progressfit.repository.EntrenamientoRepository;
import com.dwes.progressfit.repository.SerieRepository;
import com.dwes.progressfit.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EntrenamientoService {

    private final EntrenamientoRepository entrenamientoRepository;
    private final UsuarioRepository usuarioRepository;
    private final SerieRepository serieRepository;
    private final EntrenamientoEjercicioRepository entrenamientoEjercicioRepository;

    public EntrenamientoService(
            EntrenamientoRepository entrenamientoRepository,
            UsuarioRepository usuarioRepository,
            SerieRepository serieRepository,
            EntrenamientoEjercicioRepository entrenamientoEjercicioRepository) {
        this.entrenamientoRepository = entrenamientoRepository;
        this.usuarioRepository = usuarioRepository;
        this.serieRepository = serieRepository;
        this.entrenamientoEjercicioRepository = entrenamientoEjercicioRepository;
    }

    private EntrenamientoResponseDTO toResponseDTO(Entrenamiento e) {
        return EntrenamientoResponseDTO.builder()
                .idEntrenamiento(e.getIdEntrenamiento())
                .idUsuario(e.getUsuario().getIdUsuario())
                .nombre(e.getNombre())
                .inicio(e.getInicio())
                .fin(e.getFin())
                .valoracion(e.getValoracion())
                .fatigaPercibida(e.getFatigaPercibida())
                .comentario(e.getComentario())
                .build();
    }

    //DTO COMPLETO DE UN EJERCICIO
    private EntrenamientoEjercicioCompletoDTO toEjercicioCompletoDTO(EntrenamientoEjercicio ee) {
        List<SerieSimpleDTO> seriesDTO = serieRepository
                .findByEntrenamientoEjercicioIdEntrenamientoEjercicioOrderByNumeroSerie(
                        ee.getIdEntrenamientoEjercicio())
                .stream()
                .map(s -> SerieSimpleDTO.builder()
                        .idSerie(s.getIdSerie())
                        .numeroSerie(s.getNumeroSerie())
                        .repeticiones(s.getRepeticiones())
                        .peso(s.getPeso())
                        .rir(s.getRir())
                        .build())
                .toList();

        return EntrenamientoEjercicioCompletoDTO.builder()
                .idEntrenamientoEjercicio(ee.getIdEntrenamientoEjercicio())
                .idEjercicio(ee.getEjercicio().getIdEjercicio())
                .nombreEjercicio(ee.getEjercicio().getNombre())
                .idMusculo(ee.getEjercicio().getMusculo().getIdMusculo())
                .nombreMusculo(ee.getEjercicio().getMusculo().getNombre())
                .orden(ee.getOrden())
                .notas(ee.getNotas())
                .series(seriesDTO)
                .build();
    }

    // ─── CRUD BÁSICO ────────────────────────────────────────────────────────────

    public EntrenamientoResponseDTO crearEntrenamientoDTO(EntrenamientoCreateDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
                .orElseThrow(() ->
                        new IllegalArgumentException("El usuario no existe"));
        if (dto.getNombre() == null || dto.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del entrenamiento es obligatorio");
        }
        String nombreLimpio = dto.getNombre().trim();
        if (entrenamientoRepository.existsByUsuarioIdUsuarioAndNombreIgnoreCase(
                dto.getIdUsuario(), nombreLimpio)) {
            throw new IllegalArgumentException("Ya tienes un entrenamiento con ese nombre");
        }
        Entrenamiento entrenamiento = new Entrenamiento();
        entrenamiento.setUsuario(usuario);
        entrenamiento.setNombre(nombreLimpio);
        entrenamiento.setInicio(LocalDateTime.now());
        Entrenamiento guardado = entrenamientoRepository.save(entrenamiento);
        return toResponseDTO(guardado);
    }

    public List<EntrenamientoResponseDTO> listarDTO() {
        return entrenamientoRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public List<EntrenamientoResponseDTO> listarPorUsuarioDTO(Long idUsuario) {
        return entrenamientoRepository.findByUsuarioIdUsuario(idUsuario)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public EntrenamientoResponseDTO buscarPorIdDTO(Long id) {
        Entrenamiento entrenamiento = entrenamientoRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("El entrenamiento no existe"));
        return toResponseDTO(entrenamiento);
    }

    //CERRAR / VALORAR
    public EntrenamientoResponseDTO cerrarEntrenamientoDesdeDTO(
            Long idEntrenamiento, EntrenamientoCerrarDTO dto) {
        Entrenamiento entrenamiento = entrenamientoRepository.findById(idEntrenamiento)
                .orElseThrow(() ->
                        new IllegalArgumentException("El entrenamiento no existe"));
        if (entrenamiento.getFin() != null) {
            throw new IllegalStateException("El entrenamiento ya está cerrado");
        }
        List<EntrenamientoEjercicio> ejercicios = entrenamientoEjercicioRepository
                .findByEntrenamientoIdEntrenamientoOrderByOrden(idEntrenamiento);
        if (ejercicios.isEmpty()) {
            throw new IllegalStateException("No se puede cerrar un entrenamiento sin ejercicios");
        }
        if (dto.getValoracion() != null && (dto.getValoracion() < 1 || dto.getValoracion() > 5)) {
            throw new IllegalArgumentException("La valoración debe estar entre 1 y 5");
        }
        if (dto.getFatigaPercibida() != null && (dto.getFatigaPercibida() < 1 || dto.getFatigaPercibida() > 10)) {
            throw new IllegalArgumentException("La fatiga debe estar entre 1 y 10");
        }
        entrenamiento.setFin(LocalDateTime.now());
        entrenamiento.setValoracion(dto.getValoracion());
        entrenamiento.setFatigaPercibida(dto.getFatigaPercibida());
        entrenamiento.setComentario(dto.getComentario());
        Entrenamiento actualizado = entrenamientoRepository.save(entrenamiento);
        return toResponseDTO(actualizado);
    }

    public EntrenamientoResponseDTO valorarEntrenamiento(Long id, EntrenamientoCerrarDTO dto) {
        Entrenamiento entrenamiento = entrenamientoRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("El entrenamiento no existe"));
        if (entrenamiento.getFin() == null) {
            throw new IllegalStateException("El entrenamiento no está cerrado todavía");
        }
        if (dto.getValoracion() != null && (dto.getValoracion() < 1 || dto.getValoracion() > 5)) {
            throw new IllegalArgumentException("La valoración debe estar entre 1 y 5");
        }
        if (dto.getFatigaPercibida() != null && (dto.getFatigaPercibida() < 1 || dto.getFatigaPercibida() > 10)) {
            throw new IllegalArgumentException("La fatiga debe estar entre 1 y 10");
        }
        entrenamiento.setValoracion(dto.getValoracion());
        entrenamiento.setFatigaPercibida(dto.getFatigaPercibida());
        entrenamiento.setComentario(dto.getComentario());
        Entrenamiento actualizado = entrenamientoRepository.save(entrenamiento);
        return toResponseDTO(actualizado);
    }

    //ENTRENAMIENTOS COMPLETOS

    public EntrenamientoCompletoDTO obtenerEntrenamientoCompleto(Long idEntrenamiento) {
        Entrenamiento entrenamiento = entrenamientoRepository.findById(idEntrenamiento)
                .orElseThrow(() ->
                        new IllegalArgumentException("El entrenamiento no existe"));
        List<EntrenamientoEjercicio> ejercicios =
                entrenamientoEjercicioRepository
                        .findByEntrenamientoIdEntrenamientoOrderByOrden(idEntrenamiento);
        List<EntrenamientoEjercicioCompletoDTO> ejerciciosDTO = ejercicios.stream()
                .map(this::toEjercicioCompletoDTO)
                .toList();
        return EntrenamientoCompletoDTO.builder()
                .idEntrenamiento(entrenamiento.getIdEntrenamiento())
                .nombre(entrenamiento.getNombre())
                .inicio(entrenamiento.getInicio())
                .fin(entrenamiento.getFin())
                .valoracion(entrenamiento.getValoracion())
                .fatigaPercibida(entrenamiento.getFatigaPercibida())
                .comentario(entrenamiento.getComentario())
                .ejercicios(ejerciciosDTO)
                .build();
    }

    public List<EntrenamientoCompletoDTO> listarCompletoPorUsuario(Long idUsuario) {
        return entrenamientoRepository.findByUsuarioIdUsuario(idUsuario)
                .stream()
                .filter(e -> e.getFin() != null)
                .map(e -> {
                    List<EntrenamientoEjercicio> ejercicios =
                            entrenamientoEjercicioRepository
                                    .findByEntrenamientoIdEntrenamientoOrderByOrden(
                                            e.getIdEntrenamiento());
                    List<EntrenamientoEjercicioCompletoDTO> ejerciciosDTO = ejercicios.stream()
                            .map(this::toEjercicioCompletoDTO)
                            .toList();
                    return EntrenamientoCompletoDTO.builder()
                            .idEntrenamiento(e.getIdEntrenamiento())
                            .nombre(e.getNombre())
                            .inicio(e.getInicio())
                            .fin(e.getFin())
                            .valoracion(e.getValoracion())
                            .fatigaPercibida(e.getFatigaPercibida())
                            .comentario(e.getComentario())
                            .ejercicios(ejerciciosDTO)
                            .build();
                })
                .toList();
    }

    //ELIMINAR
    public void eliminar(Long id) {
        Entrenamiento entrenamiento = entrenamientoRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("El entrenamiento no existe"));
        if (entrenamiento.getFin() != null) {
            throw new IllegalStateException("No se puede eliminar un entrenamiento cerrado");
        }
        entrenamientoRepository.delete(entrenamiento);
    }
}