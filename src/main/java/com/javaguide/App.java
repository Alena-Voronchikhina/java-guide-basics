package com.javaguide;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.time.Instant;

public class App {
    public static void main(String[] args) {
        configurePort();
        staticFiles.location("/public");

        get("/health", (req, res) -> {
            res.type("application/json");
            String javaVersion = System.getProperty("java.version");
            return "{" +
                "\"status\":\"ok\"," +
                "\"time\":\"" + Instant.now() + "\"," +
                "\"javaVersion\":\"" + javaVersion + "\"" +
                "}";
        });
    }

    private static void configurePort() {
        String portValue = System.getenv("PORT");
        if (portValue == null || portValue.isBlank()) {
            port(4567);
            return;
        }

        try {
            port(Integer.parseInt(portValue));
        } catch (NumberFormatException ex) {
            port(4567);
        }
    }
}