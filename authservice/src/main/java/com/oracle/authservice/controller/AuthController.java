package com.oracle.authservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.oracle.authservice.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> req) {
        String username = req.get("username");
        String password = req.get("password");
        return ResponseEntity.ok(authService.login(username, password));
    }
    
    
    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refresh(@RequestBody Map<String, String> req) {
        String refreshToken = req.get("refresh_token");
        return ResponseEntity.ok(authService.refresh(refreshToken));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // For stateless JWT, just tell frontend to delete the token
        return ResponseEntity.ok(Map.of("message", "Logged out successfully. Please remove token from client."));
    }
    
    

}
