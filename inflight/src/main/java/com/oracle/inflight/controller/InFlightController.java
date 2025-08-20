package com.oracle.inflight.controller;


import com.oracle.inflight.entity.Booking;
import com.oracle.inflight.entity.ServiceTransactions;
import com.oracle.inflight.repository.BookingRepository;
import com.oracle.inflight.repository.FlightRepository;
import com.oracle.inflight.repository.ServiceTransactionsRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.util.List;

@RestController
@RequestMapping("/inflight")
public class InFlightController {
    private final BookingRepository bookingRepository;
    private final ServiceTransactionsRepository serviceTransactionsRepository;
    private final FlightRepository flightRepository;

    public InFlightController(BookingRepository bookingRepository,
                              ServiceTransactionsRepository serviceTransactionsRepository, FlightRepository flightRepository) {
        this.bookingRepository = bookingRepository;
        this.serviceTransactionsRepository = serviceTransactionsRepository;
        this.flightRepository = flightRepository;
    }

    // // ✅ GET all services for passengers of a flight
    // @GetMapping("/flight/{flightId}/services")
    // public List<ServiceTransactions> getServicesForFlight(@PathVariable Long flightId) {
    //     // get all passengers of the flight
    //     List<Booking> bookings = bookingRepository.findByFlightId(flightId);
    //     return bookings.stream()
    //             .flatMap(b -> serviceTransactionsRepository.findByPassengerId(b.getPassengerId()).stream())
    //             .toList();
    // }

    @GetMapping("/flight/{flightId}/services")
    public ResponseEntity<String> getServicesForFlight(@PathVariable Long flightId) {
        return flightRepository.findById(flightId)
                .map(flight -> ResponseEntity.ok(flight.getServices()))
                .orElse(ResponseEntity.notFound().build());
    }


    // ✅ POST add service transaction (ancillary / meals / shopping)
    @PostMapping("/add-service")
    public ServiceTransactions addService(@RequestBody ServiceTransactions transaction) {
        return serviceTransactionsRepository.save(transaction);
    }

    // ✅ PUT change meal (already working, but kept here)
    @PutMapping("/change-meal")
    public Booking changeMeal(@RequestBody MealChangeRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setMealPref(request.getMealPref());
        return bookingRepository.save(booking);
    }

    // ✅ POST add shopping item
    @PostMapping("/add-shopping")
    public ServiceTransactions addShopping(@RequestBody ServiceTransactions transaction) {
        transaction.setServiceId(3L); // force it as shopping
        return serviceTransactionsRepository.save(transaction);
    }

    // DTO for meal change
    public static class MealChangeRequest {
        private Long bookingId;
        private String mealPref;

        public Long getBookingId() { return bookingId; }
        public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

        public String getMealPref() { return mealPref; }
        public void setMealPref(String mealPref) { this.mealPref = mealPref; }
    }

}
