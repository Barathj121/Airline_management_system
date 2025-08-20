package com.oracle.airlinebackend.admin_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oracle.airlinebackend.admin_service.entity.Flight;

@Repository
public interface FlightRepo extends JpaRepository<Flight, Long> {
    // Extra custom queries can be added if needed
}
