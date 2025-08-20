package com.oracle.inflight.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "flights")
public class Flights {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_id")
    private Long flightId;

    @Column(name = "flight_num", nullable = false)
    private String flightNum;

    @Column(name = "aircraft_type")
    private String aircraftType;

    @Column(name = "no_of_seats")
    private Integer noOfSeats;

    // Store JSON as string (we can parse it when needed)
    @Column(name = "services", columnDefinition = "CLOB")
    private String services;

    // ----- Getters and Setters -----

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

    public Integer getNoOfSeats() {
        return noOfSeats;
    }

    public void setNoOfSeats(Integer noOfSeats) {
        this.noOfSeats = noOfSeats;
    }

    public String getServices() {
        return services;
    }

    public void setServices(String services) {
        this.services = services;
    }
}
