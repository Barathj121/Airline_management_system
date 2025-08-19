package com.oracle.airlinebackend.admin_service.service;

import com.oracle.airlinebackend.admin_service.entity.Passenger;
import com.oracle.airlinebackend.admin_service.repository.PassengerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PassengerService {

    private final PassengerRepository passengerRepository;

    public PassengerService(PassengerRepository passengerRepository) {
        this.passengerRepository = passengerRepository;
    }

    // ✅ CREATE
    public Passenger createPassenger(Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    // ✅ READ (all passengers)
    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }

    // ✅ READ (single passenger by ID)
    public Passenger getPassengerById(Long id) {
        Optional<Passenger> passenger = passengerRepository.findById(id);
        return passenger.orElseThrow(() -> 
                new RuntimeException("Passenger not found with ID: " + id));
    }

    // ✅ UPDATE
    public Passenger updatePassenger(Long id, Passenger passengerDetails) {
        Passenger passenger = passengerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Passenger not found with ID: " + id));

        passenger.setName(passengerDetails.getName());
        passenger.setDob(passengerDetails.getDob());
        passenger.setPassport(passengerDetails.getPassport());
        passenger.setAddress(passengerDetails.getAddress());

        return passengerRepository.save(passenger);
    }

    // ✅ DELETE
    public void deletePassenger(Long id) {
        Passenger passenger = passengerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Passenger not found with ID: " + id));
        passengerRepository.delete(passenger);
    }
}
