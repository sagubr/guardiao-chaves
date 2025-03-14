package github.sagubr.controllers;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ApiError(String message, String details) {

}
