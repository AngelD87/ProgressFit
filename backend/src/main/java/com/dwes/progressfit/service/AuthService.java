package com.dwes.progressfit.service;

import com.dwes.progressfit.config.JwtUtil;
import com.dwes.progressfit.dto.LoginRequestDTO;
import com.dwes.progressfit.dto.LoginResponseDTO;
import com.dwes.progressfit.model.Usuario;
import com.dwes.progressfit.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {

        // BUSCAR USUARIO POR EMAIL
        String email = dto.getEmail().trim().toLowerCase();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Email o contraseña incorrectos"));

        // VERIFICAR CONTRASEÑA CON BCRYPT
        if (!passwordEncoder.matches(dto.getPassword(), usuario.getPasswordHash())) {
            throw new IllegalArgumentException("Email o contraseña incorrectos");
        }

        // VERIFICAR QUE ESTÁ ACTIVO
        if (!usuario.getIsActive()) {
            throw new IllegalStateException("Usuario desactivado");
        }

        // GENERAR TOKEN JWT
        String token = jwtUtil.generarToken(
                usuario.getEmail(),
                usuario.getRol().name()
        );

        return LoginResponseDTO.builder()
                .idUsuario(usuario.getIdUsuario())
                .nombre(usuario.getNombre())
                .email(usuario.getEmail())
                .rol(usuario.getRol())
                .token(token)
                .build();
    }
}