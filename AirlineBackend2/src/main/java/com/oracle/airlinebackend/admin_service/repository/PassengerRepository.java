package com.oracle.airlinebackend.admin_service.repository;

import com.oracle.airlinebackend.admin_service.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    // You can add custom queries here if needed
    // Example: List<Passenger> findByName(String name);
}
