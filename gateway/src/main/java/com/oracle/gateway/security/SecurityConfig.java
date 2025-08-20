package com.oracle.gateway.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        // Keep this minimal — JwtAuthFilter handles authentication/401 responses
        http
          .csrf(ServerHttpSecurity.CsrfSpec::disable)
          .authorizeExchange(exchanges -> exchanges
              .anyExchange().permitAll() // gateway's JwtAuthFilter will enforce auth
          );

        // don't configure oauth2ResourceServer here since we do manual parsing in the global filter
        return http.build();
    }
}
