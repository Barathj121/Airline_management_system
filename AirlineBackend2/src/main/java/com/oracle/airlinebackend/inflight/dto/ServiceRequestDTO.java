package com.oracle.airlinebackend.inflight.dto;


public class ServiceRequestDTO {
    private Long passengerId;
    private Long serviceId;
    private String name;
    private Double amount;
    private Integer quantity;
    public ServiceRequestDTO(Long passengerId, Long serviceId, String name, Double amount, Integer quantity) {
        this.passengerId = passengerId;
        this.serviceId = serviceId;
        this.name = name;
        this.amount = amount;
        this.quantity = quantity;
    }
    public Long getPassengerId() {
        return passengerId;
    }
    public void setPassengerId(Long passengerId) {
        this.passengerId = passengerId;
    }
    public Long getServiceId() {
        return serviceId;
    }
    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}