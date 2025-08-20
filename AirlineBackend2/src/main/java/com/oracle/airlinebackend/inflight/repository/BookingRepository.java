package com.oracle.airlinebackend.inflight.repository;


import com.oracle.airlinebackend.inflight.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


import org.springframework.stereotype.Repository;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByFlightId(Long flightId);
}
