package com.oracle.airlinebackend.admin_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "FLIGHTS")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // works for Oracle sequence if configured
    @Column(name = "FLIGHT_ID")
    private Long flightId;

    @Column(name = "FLIGHT_NUM", nullable = false, length = 20, unique = true)
    private String flightNum;

    @Column(name = "AIRCRAFT_TYPE", length = 50)
    private String aircraftType;

    @Column(name = "SERVICES", columnDefinition = "CLOB")
    private String services;

    @Column(name = "NO_OF_SEATS")
    private Integer noOfSeats;

    // --- Getters and Setters ---
    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public String getFlightNum() {
        return flightNum;
    }

    public void setFlightNum(String flightNum) {
        this.flightNum = flightNum;
    }

    public String getAircraftType() {
        return aircraftType;
    }

    public void setAircraftType(String aircraftType) {
        this.aircraftType = aircraftType;
    }

    public String getServices() {
        return services;
    }

    public void setServices(String services) {
        this.services = services;
    }

    public Integer getNoOfSeats() {
        return noOfSeats;
    }

    public void setNoOfSeats(Integer noOfSeats) {
        this.noOfSeats = noOfSeats;
    }
}
