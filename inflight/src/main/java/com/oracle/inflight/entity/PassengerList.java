package com.oracle.inflight.entity;


import jakarta.persistence.*;
import java.time.LocalDate;

import org.hibernate.annotations.Immutable;

@Entity
@Table(name = "passenger_list") // maps to your view
@Immutable // makes it read-only
public class PassengerList {

    @Id
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "pass_id")
    private Long passId;

    @Column(name = "passenger_name")
    private String passname;

    @Column(name = "flight_id")
    private Long flightId;

    @Column(name = "flight_date")
    private LocalDate flightDate;

    @Column(name = "seat_no")
    private String seatNo;

    @Column(name = "checkedinornot")
    private String checkedInOrNot;

    @Column(name = "meal_pref")
    private String mealPref;

    @Column(name = "wheelchair")
    private Boolean wheelchair;

    @Column(name = "travelwithinfant")
    private Boolean travelWithInfant;

    @Column(name = "servicesavail")
    private String servicesAvail;

    // Getters and setters
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Long getPassId() { return passId; }
    public void setPassId(Long passId) { this.passId = passId; }

    public String getpassname() { return passname; }
    public void setpassname(String passname) { this.passname = passname; }

    public Long getFlightId() { return flightId; }
    public void setFlightId(Long flightId) { this.flightId = flightId; }

    public LocalDate getFlightDate() { return flightDate; }
    public void setFlightDate(LocalDate flightDate) { this.flightDate = flightDate; }

    public String getSeatNo() { return seatNo; }
    public void setSeatNo(String seatNo) { this.seatNo = seatNo; }

    public String getCheckedInOrNot() { return checkedInOrNot; }
    public void setCheckedInOrNot(String checkedInOrNot) { this.checkedInOrNot = checkedInOrNot; }

    public String getMealPref() { return mealPref; }
    public void setMealPref(String mealPref) { this.mealPref = mealPref; }

    public Boolean getWheelchair() { return wheelchair; }
    public void setWheelchair(Boolean wheelchair) { this.wheelchair = wheelchair; }

    public Boolean getTravelWithInfant() { return travelWithInfant; }
    public void setTravelWithInfant(Boolean travelWithInfant) { this.travelWithInfant = travelWithInfant; }

    public String getServicesAvail() { return servicesAvail; }
    public void setServicesAvail(String servicesAvail) { this.servicesAvail = servicesAvail; }
}
