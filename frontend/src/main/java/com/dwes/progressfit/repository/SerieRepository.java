package com.dwes.progressfit.repository;

import com.dwes.progressfit.model.Serie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SerieRepository extends JpaRepository<Serie, Long> {
    List<Serie> findByEntrenamientoEjercicioIdEntrenamientoEjercicioOrderByNumeroSerie(Long idEntrenamientoEjercicio);
    boolean existsByEntrenamientoEjercicioIdEntrenamientoEjercicioAndNumeroSerie(
            Long idEntrenamientoEjercicio,
            Integer numeroSerie
    );
}