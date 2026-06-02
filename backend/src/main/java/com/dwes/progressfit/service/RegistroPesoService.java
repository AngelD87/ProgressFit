package com.dwes.progressfit.service;

import com.dwes.progressfit.dto.RegistroPesoCreateDTO;
import com.dwes.progressfit.dto.RegistroPesoResponseDTO;
import com.dwes.progressfit.model.RegistroPeso;
import com.dwes.progressfit.model.Usuario;
import com.dwes.progressfit.repository.RegistroPesoRepository;
import com.dwes.progressfit.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RegistroPesoService {

    private final RegistroPesoRepository registroPesoRepository;
    private final UsuarioRepository usuarioRepository;

    public RegistroPesoService(
            RegistroPesoRepository registroPesoRepository,
            UsuarioRepository usuarioRepository) {
        this.registroPesoRepository = registroPesoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    private RegistroPesoResponseDTO toResponseDTO(RegistroPeso r) {
        return RegistroPesoResponseDTO.builder()
                .idRegistroPeso(r.getIdRegistroPeso())
                .peso(r.getPeso())
                .fecha(r.getFecha())
                .build();
    }

    //GUARDA EL PESO DE HOY (UNO POR DIA)
    public RegistroPesoResponseDTO guardarPeso(RegistroPesoCreateDTO dto) {

        Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
                .orElseThrow(() ->
                        new IllegalArgumentException("El usuario no existe"));

        //VALIDAMOS
        if (dto.getPeso() == null || dto.getPeso() < 30 || dto.getPeso() > 300) {
            throw new IllegalArgumentException("El peso debe estar entre 30 y 300kg");
        }

        LocalDate hoy = LocalDate.now();

        //SI YA HAY UN REGISTRO DE HOY LO ACTUALIZAMOS
        Optional<RegistroPeso> existente =
                registroPesoRepository.findByUsuarioIdUsuarioAndFecha(dto.getIdUsuario(), hoy);

        RegistroPeso registro;
        if (existente.isPresent()) {
            registro = existente.get();
            registro.setPeso(dto.getPeso());
        } else {

            registro = new RegistroPeso();
            registro.setUsuario(usuario);
            registro.setPeso(dto.getPeso());
            registro.setFecha(hoy);
        }

        RegistroPeso guardado = registroPesoRepository.save(registro);

    //ACTUALIZAMOS EL PESO ACTUAL DEL USUARIO PARA EL DASHBOARD
        usuario.setPesoCorporal(dto.getPeso());
        usuarioRepository.save(usuario);

        return toResponseDTO(guardado);
    }

    ///HISTORIAL DE PESOS
    public List<RegistroPesoResponseDTO> listarPorUsuario(Long idUsuario) {
        return registroPesoRepository.findByUsuarioIdUsuarioOrderByFecha(idUsuario)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }
}