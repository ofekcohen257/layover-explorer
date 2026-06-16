package com.layoverexplorer.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "points_of_interest")
public class PointOfInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // e.g. "arts", "nightlife", "food"

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false)
    private int transitTimeMinutes;

    @ManyToOne
    @JoinColumn(name = "airport_iata_code", nullable = false)
    private Airport airport;

    public PointOfInterest() {}

    public PointOfInterest(String name, String category, double rating, int transitTimeMinutes, Airport airport) {
        this.name = name;
        this.category = category;
        this.rating = rating;
        this.transitTimeMinutes = transitTimeMinutes;
        this.airport = airport;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getTransitTimeMinutes() {
        return transitTimeMinutes;
    }

    public void setTransitTimeMinutes(int transitTimeMinutes) {
        this.transitTimeMinutes = transitTimeMinutes;
    }

    public Airport getAirport() {
        return airport;
    }

    public void setAirport(Airport airport) {
        this.airport = airport;
    }
}
