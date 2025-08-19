package com.oracle.inflight.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.inflight.entity.Flights;

public interface FlightRepository extends JpaRepository<Flights, Long> {
}
