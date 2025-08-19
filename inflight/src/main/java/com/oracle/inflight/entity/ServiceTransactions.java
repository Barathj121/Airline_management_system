package com.oracle.inflight.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_transactions")
public class ServiceTransactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transId;

    @Column(nullable = false)
    private Long passengerId;

    @Column(nullable = false)
    private Long serviceId; // 1=ancillary, 2=meals, 3=shopping

    private LocalDateTime time = LocalDateTime.now();

    @Lob
    private String details; // JSON string

    // Getters & Setters
    public Long getTransId() { return transId; }
    public void setTransId(Long transId) { this.transId = transId; }

    public Long getPassengerId() { return passengerId; }
    public void setPassengerId(Long passengerId) { this.passengerId = passengerId; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public LocalDateTime getTime() { return time; }
    public void setTime(LocalDateTime time) { this.time = time; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
