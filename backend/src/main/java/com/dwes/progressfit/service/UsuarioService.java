package com.dwes.progressfit.service;

import com.dwes.progressfit.dto.UsuarioAdminUpdateDTO;
import com.dwes.progressfit.dto.UsuarioCreateDTO;
import com.dwes.progressfit.dto.UsuarioResponseDTO;
import com.dwes.progressfit.dto.UsuarioUpdateDTO;
import com.dwes.progressfit.model.Rol;
import com.dwes.progressfit.model.Usuario;
import com.dwes.progressfit.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private UsuarioResponseDTO toResponseDTO(Usuario usuario) {
        return UsuarioResponseDTO.builder()
                .idUsuario(usuario.getIdUsuario())
                .nombre(usuario.getNombre())
                .email(usuario.getEmail())
                .pesoCorporal(usuario.getPesoCorporal())
                .altura(usuario.getAltura())
                .isActive(usuario.getIsActive())
                .rol(usuario.getRol())
                .avatar(usuario.getAvatar())
                .build();
    }

    public UsuarioResponseDTO crearUsuarioDesdeDTO(UsuarioCreateDTO dto) {
        if (dto.getNombre() == null || dto.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        if (dto.getNombre().trim().length() < 2 || dto.getNombre().trim().length() > 50) {
            throw new IllegalArgumentException("El nombre debe tener entre 2 y 50 caracteres");
        }
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("El email es obligatorio");
        }
        if (dto.getPassword() == null || dto.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("La contraseña es obligatoria");
        }
        if (dto.getPassword().trim().length() < 6) {
            throw new IllegalArgumentException("La contraseña debe tener al menos 6 caracteres");
        }
        String email = dto.getEmail().trim().toLowerCase();
        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
        if (dto.getPesoCorporal() != null) {
            if (dto.getPesoCorporal() < 30 || dto.getPesoCorporal() > 300) {
                throw new IllegalArgumentException("El peso debe estar entre 30 y 300kg");
            }
        }
        if (dto.getAltura() != null) {
            if (dto.getAltura() < 1.0 || dto.getAltura() > 3.0) {
                throw new IllegalArgumentException("La altura debe estar entre 1 y 3 metros");
            }
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre().trim());
        usuario.setEmail(email);
        usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        usuario.setPesoCorporal(dto.getPesoCorporal());
        usuario.setAltura(dto.getAltura());
        usuario.setFechaRegistro(LocalDateTime.now());
        usuario.setIsActive(true);
        usuario.setRol(Rol.USUARIO);
        Usuario guardado = usuarioRepository.save(usuario);
        return toResponseDTO(guardado);
    }

    public List<UsuarioResponseDTO> listarUsuariosDTO() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public UsuarioResponseDTO buscarPorIdDTO(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El usuario no existe"));
        return toResponseDTO(usuario);
    }

    public UsuarioResponseDTO actualizarDesdeDTO(Long id, UsuarioUpdateDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El usuario no existe"));
        if (dto.getNombre() != null) {
            if (dto.getNombre().trim().isEmpty()) {
                throw new IllegalArgumentException("El nombre no puede estar vacío");
            }
            if (dto.getNombre().trim().length() < 2 || dto.getNombre().trim().length() > 50) {
                throw new IllegalArgumentException("El nombre debe tener entre 2 y 50 caracteres");
            }
            usuario.setNombre(dto.getNombre().trim());
        }
        if (dto.getEmail() != null) {
            if (dto.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("El email no puede estar vacío");
            }
            String emailNuevo = dto.getEmail().trim().toLowerCase();
            boolean cambiaEmail = !emailNuevo.equals(usuario.getEmail());
            if (cambiaEmail && usuarioRepository.existsByEmail(emailNuevo)) {
                throw new IllegalArgumentException("El email ya está registrado");
            }
            usuario.setEmail(emailNuevo);
        }
        if (dto.getPassword() != null) {
            if (dto.getPassword().trim().isEmpty()) {
                throw new IllegalArgumentException("La contraseña no puede estar vacía");
            }
            if (dto.getPassword().trim().length() < 6) {
                throw new IllegalArgumentException("La contraseña debe tener al menos 6 caracteres");
            }
            usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }
        if (dto.getPesoCorporal() != null) {
            if (dto.getPesoCorporal() < 30 || dto.getPesoCorporal() > 300) {
                throw new IllegalArgumentException("El peso debe estar entre 30 y 300kg");
            }
            usuario.setPesoCorporal(dto.getPesoCorporal());
        }
        if (dto.getAltura() != null) {
            if (dto.getAltura() < 1.0 || dto.getAltura() > 3.0) {
                throw new IllegalArgumentException("La altura debe estar entre 1 y 3 metros");
            }
            usuario.setAltura(dto.getAltura());
        }

        if (dto.getAvatar() != null) {
            usuario.setAvatar(dto.getAvatar());
        }

        Usuario actualizado = usuarioRepository.save(usuario);
        return toResponseDTO(actualizado);
    }

    public UsuarioResponseDTO actualizarComoAdmin(Long id, UsuarioAdminUpdateDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El usuario no existe"));
        if (dto.getIsActive() != null) {
            usuario.setIsActive(dto.getIsActive());
        }
        if (dto.getRol() != null) {
            usuario.setRol(dto.getRol());
        }
        Usuario actualizado = usuarioRepository.save(usuario);
        return toResponseDTO(actualizado);
    }

    public void eliminarUsuario(Long id) {
        usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El usuario no existe"));
        usuarioRepository.deleteById(id);
    }
}