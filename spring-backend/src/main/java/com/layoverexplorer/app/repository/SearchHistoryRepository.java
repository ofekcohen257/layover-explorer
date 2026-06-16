package com.layoverexplorer.app.repository;

import com.layoverexplorer.app.entity.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findByUserEmailOrderBySearchedAtDesc(String email);
}
