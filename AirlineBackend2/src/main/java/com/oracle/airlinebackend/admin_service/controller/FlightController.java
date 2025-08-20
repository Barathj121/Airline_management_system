package com.oracle.airlinebackend.admin_service.controller;

import com.oracle.airlinebackend.admin_service.entity.Flight;
import com.oracle.airlinebackend.admin_service.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    // Create Flight
    @PostMapping
    public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) {
        return ResponseEntity.ok(flightService.saveFlight(flight));
    }

    // Get All Flights
    @GetMapping
    public ResponseEntity<List<Flight>> getAllFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    // Get Flight by ID
    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        return flightService.getFlightById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update Flight
    @PutMapping("/{id}")
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody Flight updatedFlight) {
        return flightService.getFlightById(id)
                .map(existing -> {
                    existing.setFlightNum(updatedFlight.getFlightNum());
                    existing.setAircraftType(updatedFlight.getAircraftType());
                    existing.setServices(updatedFlight.getServices());
                    existing.setNoOfSeats(updatedFlight.getNoOfSeats());
                    return ResponseEntity.ok(flightService.saveFlight(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete Flight
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }
}
