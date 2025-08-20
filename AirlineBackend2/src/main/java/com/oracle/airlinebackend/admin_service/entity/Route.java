package com.oracle.airlinebackend.admin_service.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "ROUTE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Oracle 12c+ identity column
    @Column(name = "ROUTE_ID")
    private Long routeId;

    @NotBlank(message = "Arrival cannot be blank")
    @Column(name = "ARRIVAL", length = 100)
    private String arrival;

    @NotBlank(message = "Destination cannot be blank")
    @Column(name = "DESTINATION", length = 100)
    private String destination;
}
