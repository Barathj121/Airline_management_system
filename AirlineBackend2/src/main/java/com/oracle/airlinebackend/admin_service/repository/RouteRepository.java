package com.oracle.airlinebackend.admin_service.repository;

import com.oracle.airlinebackend.admin_service.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
}
