package com.oracle.airlinebackend.authservice;

import com.oracle.airlinebackend.authservice.jwtutil.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collections;

@Configuration
public class SecurityConfig {

    private final JwtUtil jwt;

    public SecurityConfig(JwtUtil jwt) {
        this.jwt = jwt;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()  // allow login + refresh
                        .anyRequest().authenticated()             // everything else requires JWT
                )
                .addFilterBefore(new JwtAuthFilter(jwt), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // ✅ Custom JWT Filter
    static class JwtAuthFilter implements Filter {

        private final JwtUtil jwt;

        JwtAuthFilter(JwtUtil jwt) {
            this.jwt = jwt;
        }

        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                throws IOException, ServletException {

            HttpServletRequest req = (HttpServletRequest) request;
            String authHeader = req.getHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                try {
                    Claims claims = jwt.validateToken(token);
                    String username = claims.getSubject();

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());

                    SecurityContextHolder.getContext().setAuthentication(authentication);

                } catch (Exception e) {
                    ((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid/Expired token");
                    return;
                }
            }

            chain.doFilter(request, response);
        }
    }
}
