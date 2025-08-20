package com.oracle.inflight.entity;



import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "passenger_id")
    private Long passengerId;

    @Column(name = "flight_id")
    private Long flightId;

    @Column(name = "arrival")
    private String arrival;

    @Column(name = "destination")
    private String destination;

    @Column(name = "arr_time")
    private LocalDateTime arrTime;

    @Column(name = "dest_time")
    private LocalDateTime destTime;

    @Column(name = "meal_pref")
    private String mealPref;

    @Column(name = "needwheelchair")
    private String needWheelchair; // "Y" or "N"

    @Column(name = "travellwithinfant")
    private String travelWithInfant; // "Y" or "N"

    @Column(name = "service_availed")
    private String serviceAvailed; // store JSON string

    @Column(name = "route_id")
    private Long routeId;

    @Column(name = "seat_no")
    private String seatNo;

    // --- Getters and Setters ---
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Long getPassengerId() { return passengerId; }
    public void setPassengerId(Long passengerId) { this.passengerId = passengerId; }

    public Long getFlightId() { return flightId; }
    public void setFlightId(Long flightId) { this.flightId = flightId; }

    public String getArrival() { return arrival; }
    public void setArrival(String arrival) { this.arrival = arrival; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDateTime getArrTime() { return arrTime; }
    public void setArrTime(LocalDateTime arrTime) { this.arrTime = arrTime; }

    public LocalDateTime getDestTime() { return destTime; }
    public void setDestTime(LocalDateTime destTime) { this.destTime = destTime; }

    public String getMealPref() { return mealPref; }
    public void setMealPref(String mealPref) { this.mealPref = mealPref; }

    public String getNeedWheelchair() { return needWheelchair; }
    public void setNeedWheelchair(String needWheelchair) { this.needWheelchair = needWheelchair; }

    public String getTravelWithInfant() { return travelWithInfant; }
    public void setTravelWithInfant(String travelWithInfant) { this.travelWithInfant = travelWithInfant; }

    public String getServiceAvailed() { return serviceAvailed; }
    public void setServiceAvailed(String serviceAvailed) { this.serviceAvailed = serviceAvailed; }

    public Long getRouteId() { return routeId; }
    public void setRouteId(Long routeId) { this.routeId = routeId; }

    public String getSeatNo() { return seatNo; }
    public void setSeatNo(String seatNo) { this.seatNo = seatNo; }
}
