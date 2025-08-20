package com.oracle.airlinebackend.inflight.repository;


import com.oracle.airlinebackend.inflight.entity.ServiceTransactions;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceTransactionsRepository extends JpaRepository<ServiceTransactions, Long> {
    List<ServiceTransactions> findByPassengerId(Long passengerId);
    List<ServiceTransactions> findByServiceId(Long serviceId);
}
