package com.dwes.progressfit.repository;

import com.dwes.progressfit.model.Musculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MusculoRepository extends JpaRepository<Musculo, Long> {
}