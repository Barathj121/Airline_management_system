package com.oracle.airlinebackend.admin_service.service;

import com.oracle.airlinebackend.admin_service.entity.Route;
import com.oracle.airlinebackend.admin_service.repository.RouteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    // Create
    public Route createRoute(Route route) {
        return routeRepository.save(route);
    }

    // Read all
    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    // Read one
    public Optional<Route> getRouteById(Long id) {
        return routeRepository.findById(id);
    }

    // Update
    public Route updateRoute(Long id, Route routeDetails) {
        return routeRepository.findById(id)
                .map(route -> {
                    route.setArrival(routeDetails.getArrival());
                    route.setDestination(routeDetails.getDestination());
                    return routeRepository.save(route);
                })
                .orElseThrow(() -> new RuntimeException("Route not found with id " + id));
    }

    // Delete
    public void deleteRoute(Long id) {
        routeRepository.deleteById(id);
    }
}
