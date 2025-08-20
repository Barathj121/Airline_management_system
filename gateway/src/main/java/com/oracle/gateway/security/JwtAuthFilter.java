package com.oracle.gateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtAuthFilter implements GlobalFilter, Ordered {

    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.allowedClockSkewSeconds:60}")
    private long allowedClockSkewSeconds;

    // safe default; property expected as comma-separated string in application.yml/properties
    @Value("${security.public-paths:/auth/login,/auth/refresh,/actuator/**}")
    private String publicPathsRaw;

    private List<String> publicPaths() {
        return Arrays.stream(publicPathsRaw.split(","))
                     .map(String::trim)
                     .filter(s -> !s.isEmpty())
                     .toList();
    }

    @Override
    public int getOrder() { return -100; } // run early

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {
        final String path = exchange.getRequest().getURI().getPath();

        if (isPublic(path)) {
            return chain.filter(exchange);
        }

        final String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange, "Missing or invalid Authorization header");
        }

        final String token = authHeader.substring(7);
        final Claims claims;
        try {
            SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .setAllowedClockSkewSeconds(allowedClockSkewSeconds)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            return unauthorized(exchange, "Invalid or expired token");
        }

        // inject useful claims to downstream services
        var mutatedReq = exchange.getRequest().mutate()
                .header("X-Auth-UserId", String.valueOf(claims.get("userId")))
                .header("X-Auth-Username", String.valueOf(claims.get("username")))
                .header("X-Auth-UserType", String.valueOf(claims.get("usertype"))) // ADMIN/STAFF
                .build();

        return chain.filter(exchange.mutate().request(mutatedReq).build());
    }

    private boolean isPublic(String path) {
        for (String pattern : publicPaths()) {
            if (pathMatcher.match(pattern, path)) return true;
        }
        return false;
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange, String msg) {
        var res = exchange.getResponse();
        res.setStatusCode(HttpStatus.UNAUTHORIZED);
        res.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        var bytes = ("{\"error\":\"" + msg + "\"}").getBytes(StandardCharsets.UTF_8);
        var buffer = res.bufferFactory().wrap(bytes);
        return res.writeWith(Mono.just(buffer));
    }
}
