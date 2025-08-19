package com.oracle.airlinebackend.authservice.jwtutil;

import java.util.Date;
import java.nio.charset.StandardCharsets;
import java.security.Key;

import org.springframework.stereotype.Component;

import com.oracle.airlinebackend.authservice.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String SECRET = "aVeryLongSecretKeyThatIsAtLeastSixtyFourCharactersLongAndRandom123456!";

    private final long ACCESS_EXP = 15 * 60 * 1000; // 15 mins
    private final long REFRESH_EXP = 7 * 24 * 60 * 60 * 1000; // 7 days

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public String generateAccessToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("usertype", user.getUsertype())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_EXP))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateRefreshToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXP))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
