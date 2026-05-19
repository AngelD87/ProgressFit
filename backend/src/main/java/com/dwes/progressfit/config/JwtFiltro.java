package com.dwes.progressfit.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFiltro extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFiltro(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // LEER EL HEADER Authorization
        String header = request.getHeader("Authorization");

        // SI NO HAY TOKEN DEJAMOS PASAR
        // (rutas públicas como /login o /registro)
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // EXTRAER EL TOKEN (quitamos "Bearer ")
        String token = header.substring(7);

        // VALIDAR EL TOKEN
        if (!jwtUtil.validarToken(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // OBTENER EMAIL Y ROL DEL TOKEN
        String email = jwtUtil.obtenerEmail(token);
        String rol = jwtUtil.obtenerRol(token);

        // CREAR AUTENTICACIÓN Y METERLA EN EL CONTEXTO
        UsernamePasswordAuthenticationToken autenticacion =
                new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        List.of(new SimpleGrantedAuthority("ROLE_" + rol))
                );

        SecurityContextHolder.getContext().setAuthentication(autenticacion);

        // CONTINUAR CON LA PETICIÓN
        filterChain.doFilter(request, response);
    }
}