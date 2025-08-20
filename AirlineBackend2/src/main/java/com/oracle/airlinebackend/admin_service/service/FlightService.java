package com.oracle.airlinebackend.admin_service.service;

import com.oracle.airlinebackend.admin_service.entity.Flight;
import com.oracle.airlinebackend.admin_service.repository.FlightRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    @Autowired
    private FlightRepo flightRepo;

    // Create / Update
    public Flight saveFlight(Flight flight) {
        return flightRepo.save(flight);
    }

    // Read all
    public List<Flight> getAllFlights() {
        return flightRepo.findAll();
    }

    // Read one
    public Optional<Flight> getFlightById(Long id) {
        return flightRepo.findById(id);
    }

    // Delete
    public void deleteFlight(Long id) {
        flightRepo.deleteById(id);
    }
}
