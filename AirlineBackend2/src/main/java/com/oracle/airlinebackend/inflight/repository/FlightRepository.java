package com.oracle.airlinebackend.inflight.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.airlinebackend.inflight.entity.Flights;

public interface FlightRepository extends JpaRepository<Flights, Long> {
}
