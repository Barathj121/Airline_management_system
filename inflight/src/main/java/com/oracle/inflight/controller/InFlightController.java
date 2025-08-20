package com.oracle.inflight.controller;


import com.oracle.inflight.entity.Booking;
import com.oracle.inflight.entity.PassengerList;
import com.oracle.inflight.entity.ServiceTransactions;
import com.oracle.inflight.repository.BookingRepository;
import com.oracle.inflight.repository.PassengerListRepository;
import com.oracle.inflight.repository.ServiceTransactionsRepository;

import java.util.List;
import org.springframework.web.bind.annotation.*;

//import java.util.List;

@RestController
@RequestMapping("/inflight")
public class InFlightController {
    private final BookingRepository bookingRepository;
    private final ServiceTransactionsRepository serviceTransactionsRepository;
    private final PassengerListRepository passengerListRepository;


    public InFlightController(BookingRepository bookingRepository,
                              ServiceTransactionsRepository serviceTransactionsRepository, PassengerListRepository passengerListRepository) {
        this.bookingRepository = bookingRepository;
        this.serviceTransactionsRepository = serviceTransactionsRepository;
        this.passengerListRepository = passengerListRepository;
    }

    @GetMapping("/{id}/passengers")
    public List<PassengerList> getPassengers(@PathVariable("id") Long flightId) {
        return passengerListRepository.findByFlightId(flightId);
    }

    // ✅ POST add service transaction (ancillary / meals / shopping)
    @PostMapping("/add-service")
    public ServiceTransactions addService(@RequestBody ServiceTransactions transaction) {
        return serviceTransactionsRepository.save(transaction);
    }

//     {
//   "passengerId": 1,
//   "serviceId": 1,
//   "details": "{\"name\":\"Extra baggage\", \"amount\":2000}"
// }

    // ✅ PUT change meal (already working, but kept here)
    @PutMapping("/change-meal")
    public Booking changeMeal(@RequestBody MealChangeRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setMealPref(request.getMealPref());
        return bookingRepository.save(booking);
    }

//     {
//   "bookingId": 1,
//   "mealPref": "Non-Veg"
// }

    // ✅ POST add shopping item
    @PostMapping("/add-shopping")
    public ServiceTransactions addShopping(@RequestBody ServiceTransactions transaction) {
        transaction.setServiceId(3L); // force it as shopping
        return serviceTransactionsRepository.save(transaction);
    }

//     {
//   "passengerId": 1,
//   "details": "{\"item\":\"Perfume\", \"amount\":5000, \"quantity\":1}"
// }

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
