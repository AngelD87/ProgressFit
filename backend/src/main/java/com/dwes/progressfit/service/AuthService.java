package com.dwes.progressfit.service;

import com.dwes.progressfit.config.JwtUtil;
import com.dwes.progressfit.dto.LoginRequestDTO;
import com.dwes.progressfit.dto.LoginResponseDTO;
import com.dwes.progressfit.dto.VerificarIdentidadDTO;
import com.dwes.progressfit.dto.RecuperarPasswordDTO;
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

        //BUSCAR USUARIO POR EMAIL
        String email = dto.getEmail().trim().toLowerCase();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Email o contraseña incorrectos"));

        //VERIFICAR CONTRASEÑA CON BCRYPT
        if (!passwordEncoder.matches(dto.getPassword(), usuario.getPasswordHash())) {
            throw new IllegalArgumentException("Email o contraseña incorrectos");
        }

        //VERIFICAR QUE ESTÁ ACTIVO
        if (!usuario.getIsActive()) {
            throw new IllegalStateException("Usuario desactivado");
        }

        //GENERAR TOKEN JWT
        String token = jwtUtil.generarToken(
                usuario.getEmail(),
                usuario.getRol().name()
        );

        return LoginResponseDTO.builder()
                .idUsuario(usuario.getIdUsuario())
                .nombre(usuario.getNombre())
                .email(usuario.getEmail())
                .pesoCorporal(usuario.getPesoCorporal())
                .altura(usuario.getAltura())
                .pesoObjetivo(usuario.getPesoObjetivo())
                .nivelActividad(usuario.getNivelActividad())
                .fechaNacimiento(usuario.getFechaNacimiento())
                .sexo(usuario.getSexo())
                .rol(usuario.getRol())
                .token(token)
                .avatar(usuario.getAvatar())
                .build();
    }

    //PASO 1: VERIFICA QUE EL EMAIL Y LA FECHA DE NACIMIENTO COINCIDEN
    public void verificarIdentidad(VerificarIdentidadDTO dto) {
        String email = dto.getEmail().trim().toLowerCase();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Los datos no coinciden"));

        //COMPROBAMOS QUE LA FECHA DE NACIMIENTO ES LA MISMA
        if (usuario.getFechaNacimiento() == null ||
                !usuario.getFechaNacimiento().equals(dto.getFechaNacimiento())) {
            throw new IllegalArgumentException("Los datos no coinciden");
        }
    }

    //PASO 2: VERIFICA DE NUEVO Y CAMBIA LA CONTRASEÑA
    public void recuperarPassword(RecuperarPasswordDTO dto) {
        String email = dto.getEmail().trim().toLowerCase();
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Los datos no coinciden"));

        //VOLVEMOS A COMPROBAR LA FECHA POR SEGURIDAD
        if (usuario.getFechaNacimiento() == null ||
                !usuario.getFechaNacimiento().equals(dto.getFechaNacimiento())) {
            throw new IllegalArgumentException("Los datos no coinciden");
        }

        //VALIDAMOS LA NUEVA CONTRASEÑA
        if (dto.getNuevaPassword() == null || dto.getNuevaPassword().length() < 6) {
            throw new IllegalArgumentException("La contraseña debe tener al menos 6 caracteres");
        }

        //CIFRAMOS Y GUARDAMOS LA NUEVA CONTRASEÑA
        usuario.setPasswordHash(passwordEncoder.encode(dto.getNuevaPassword()));
        usuarioRepository.save(usuario);
    }
}