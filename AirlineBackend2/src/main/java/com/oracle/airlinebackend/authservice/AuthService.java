package com.oracle.airlinebackend.authservice;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.oracle.airlinebackend.authservice.entity.User;
import com.oracle.airlinebackend.authservice.entity.UserRepository;
import com.oracle.airlinebackend.authservice.jwtutil.JwtUtil;

import io.jsonwebtoken.Claims;




@Service
public class AuthService {
    private final UserRepository repo;
    private final JwtUtil jwt;

    public AuthService(UserRepository repo, JwtUtil jwt) {
        this.repo = repo;
        this.jwt = jwt;
    }

    public Map<String, String> login(String username, String password) {
        User user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!password.equals(user.getPassword()))  // later use BCrypt
            throw new RuntimeException("Invalid credentials");

        String access = jwt.generateAccessToken(user);
        String refresh = jwt.generateRefreshToken(user);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", access);
        tokens.put("refresh_token", refresh);
        return tokens;
    }
    
    
    public Map<String, String> refresh(String refreshToken) {
        try {
            Claims claims = jwt.validateToken(refreshToken);
            String username = claims.getSubject();

            User user = repo.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String newAccess = jwt.generateAccessToken(user);

            Map<String, String> tokens = new HashMap<>();
            tokens.put("access_token", newAccess);
            tokens.put("refresh_token", refreshToken); // keep same refresh token
            return tokens;

        } catch (Exception e) {
            throw new RuntimeException("Invalid refresh token");
        }
    }

    
}

