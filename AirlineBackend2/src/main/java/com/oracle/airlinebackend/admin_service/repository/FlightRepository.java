package com.oracle.airlinebackend.admin_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oracle.airlinebackend.admin_service.entity.Flight;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    // Extra custom queries can be added if needed
}
