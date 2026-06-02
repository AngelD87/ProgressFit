package com.dwes.progressfit.repository;

import com.dwes.progressfit.model.RegistroPeso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RegistroPesoRepository extends JpaRepository<RegistroPeso, Long> {

    //TODOS LOS REGISTROS DE UN USUARIO ORDENADOS POR FECHA
    List<RegistroPeso> findByUsuarioIdUsuarioOrderByFecha(Long idUsuario);

    //PARA QUE EL USUARIO SOLO ACTUALICE EL PESO POR DIA
    Optional<RegistroPeso> findByUsuarioIdUsuarioAndFecha(Long idUsuario, LocalDate fecha);

}