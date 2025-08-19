package com.oracle.airlinebackend.admin_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "personal_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Oracle sequence/identity support
    @Column(name = "pass_id")
    private Long passId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "passport", unique = true, length = 20)
    private String passport;

    @Column(name = "address", length = 255)
    private String address;
}
