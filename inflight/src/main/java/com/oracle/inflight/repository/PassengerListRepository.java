package com.oracle.inflight.repository;


import com.oracle.inflight.entity.PassengerList;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PassengerListRepository extends JpaRepository<PassengerList, Long> {
    List<PassengerList> findByFlightId(Long flightId);
}

