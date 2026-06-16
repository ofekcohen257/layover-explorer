package com.layoverexplorer.app.repository;

import com.layoverexplorer.app.entity.SavedFlight;
import com.layoverexplorer.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SavedFlightRepository extends JpaRepository<SavedFlight, Long> {
    List<SavedFlight> findByUserEmailOrderBySavedAtDesc(String email);
    boolean existsByUserAndFlightCode(User user, String flightCode);
    void deleteByUserAndFlightCode(User user, String flightCode);
}
