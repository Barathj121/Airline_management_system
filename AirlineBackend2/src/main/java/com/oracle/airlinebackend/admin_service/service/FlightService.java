package com.oracle.airlinebackend.admin_service.service;

import com.oracle.airlinebackend.admin_service.entity.Flight;
import com.oracle.airlinebackend.admin_service.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    // Create / Update
    public Flight saveFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    // Read all
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    // Read one
    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findById(id);
    }

    // Delete
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}
