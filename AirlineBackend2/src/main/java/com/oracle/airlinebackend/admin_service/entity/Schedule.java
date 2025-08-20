package com.oracle.airlinebackend.admin_service.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "SCHEDULE")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // For Oracle, will map to sequence if configured
    @Column(name = "SCHEDULE_ID")
    private Long scheduleId;

    @Column(name = "FLIGHT_ID", nullable = false)
    private Long flightId;

    @Column(name = "ARRIVAL", length = 100)
    private String arrival;

    @Column(name = "ARRIVAL_TIME")
    private LocalDateTime arrivalTime;

    @Column(name = "DESTINATION", length = 100)
    private String destination;

    @Column(name = "DEST_TIME")
    private LocalDateTime destTime;

    @Column(name = "STATUS", length = 50)
    private String status;

    // Getters and Setters
    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDateTime getDestTime() {
        return destTime;
    }

    public void setDestTime(LocalDateTime destTime) {
        this.destTime = destTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
