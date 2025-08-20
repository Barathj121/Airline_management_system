package com.oracle.inflight;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class InflightApplication {

	public static void main(String[] args) {
		SpringApplication.run(InflightApplication.class, args);
	}

}
