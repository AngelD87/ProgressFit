package com.dwes.progressfit.repository;

import com.dwes.progressfit.model.EntrenamientoEjercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EntrenamientoEjercicioRepository extends JpaRepository<EntrenamientoEjercicio, Long> {
    List<EntrenamientoEjercicio> findByEntrenamientoIdEntrenamientoOrderByOrden(Long idEntrenamiento);
    boolean existsByEntrenamientoIdEntrenamientoAndOrden(Long idEntrenamiento, Integer orden);
}