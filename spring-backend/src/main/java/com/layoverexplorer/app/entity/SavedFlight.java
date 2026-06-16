package com.layoverexplorer.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "saved_flights")
public class SavedFlight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String flightCode;

    @Column(nullable = false)
    private String airline;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private String layoverAirportCode;

    @Column(nullable = false)
    private int layoverDurationMinutes;

    @Column(nullable = false)
    private LocalDateTime savedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public SavedFlight() {
        this.savedAt = LocalDateTime.now();
    }

    public SavedFlight(User user, String flightCode, String airline, double price, String origin, String destination, String layoverAirportCode, int layoverDurationMinutes) {
        this();
        this.user = user;
        this.flightCode = flightCode;
        this.airline = airline;
        this.price = price;
        this.origin = origin;
        this.destination = destination;
        this.layoverAirportCode = layoverAirportCode;
        this.layoverDurationMinutes = layoverDurationMinutes;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFlightCode() {
        return flightCode;
    }

    public void setFlightCode(String flightCode) {
        this.flightCode = flightCode;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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

    public String getLayoverAirportCode() {
        return layoverAirportCode;
    }

    public void setLayoverAirportCode(String layoverAirportCode) {
        this.layoverAirportCode = layoverAirportCode;
    }

    public int getLayoverDurationMinutes() {
        return layoverDurationMinutes;
    }

    public void setLayoverDurationMinutes(int layoverDurationMinutes) {
        this.layoverDurationMinutes = layoverDurationMinutes;
    }

    public LocalDateTime getSavedAt() {
        return savedAt;
    }

    public void setSavedAt(LocalDateTime savedAt) {
        this.savedAt = savedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
