package com.oracle.inflight.repository;


import com.oracle.inflight.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


import org.springframework.stereotype.Repository;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByFlightId(Long flightId);
}
