package com.layoverexplorer.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "search_histories")
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String destination;

    private String interest;

    @Column(nullable = false)
    private int minLayoverHours;

    @Column(nullable = false)
    private LocalDateTime searchedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public SearchHistory() {
        this.searchedAt = LocalDateTime.now();
    }

    public SearchHistory(User user, String origin, String destination, String interest, int minLayoverHours) {
        this();
        this.user = user;
        this.origin = origin;
        this.destination = destination;
        this.interest = interest;
        this.minLayoverHours = minLayoverHours;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getInterest() {
        return interest;
    }

    public void setInterest(String interest) {
        this.interest = interest;
    }

    public int getMinLayoverHours() {
        return minLayoverHours;
    }

    public void setMinLayoverHours(int minLayoverHours) {
        this.minLayoverHours = minLayoverHours;
    }

    public LocalDateTime getSearchedAt() {
        return searchedAt;
    }

    public void setSearchedAt(LocalDateTime searchedAt) {
        this.searchedAt = searchedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
