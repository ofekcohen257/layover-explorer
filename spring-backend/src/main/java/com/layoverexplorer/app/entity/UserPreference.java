package com.layoverexplorer.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_preferences")
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int minLayoverHours = 4; // Default to 4

    @Column(nullable = false)
    private int maxLayoverHours = 24; // Default to 24

    @Column(columnDefinition = "TEXT")
    private String interests = ""; // Comma-separated list e.g. "arts,food"

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UserPreference() {}

    public UserPreference(User user, int minLayoverHours, int maxLayoverHours, String interests) {
        this.user = user;
        this.minLayoverHours = minLayoverHours;
        this.maxLayoverHours = maxLayoverHours;
        this.interests = interests;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getMinLayoverHours() {
        return minLayoverHours;
    }

    public void setMinLayoverHours(int minLayoverHours) {
        this.minLayoverHours = minLayoverHours;
    }

    public int getMaxLayoverHours() {
        return maxLayoverHours;
    }

    public void setMaxLayoverHours(int maxLayoverHours) {
        this.maxLayoverHours = maxLayoverHours;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
