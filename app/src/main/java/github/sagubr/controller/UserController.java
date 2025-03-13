package github.sagubr.controller;

import github.sagubr.annotations.DefaultResponses;
import github.sagubr.entities.User;
import github.sagubr.models.UserSummaryDto;
import github.sagubr.services.UserService;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Secured(SecurityRule.IS_AUTHENTICATED)
@Tag(name = "Users", description = "Classe referência para Usuário")
@RequiredArgsConstructor
@Controller("/api/users")
public class UserController {

    private final UserService service;

    @Operation(summary = "Obter todos os registros da classe usuário")
    @DefaultResponses
    @Get
    public List<User> findAllUser() {
        return service.findByActiveTrueOrderByCreatedAtDesc();
    }

    @Operation(summary = "Obter todos os registros da classe usuário resumido")
    @DefaultResponses
    @Get("/summary")
    public List<UserSummaryDto> findAllUserSummaries() {
        return service.findAllUserSummaries();
    }

    @Operation(summary = "Atualizar um registro existente na classe usuário")
    @DefaultResponses
    @Put("/update")
    public User updateUser(@Body User user) {
        return service.update(user);
    }

    @Operation(summary = "Criar novo registro na classe usuário")
    @DefaultResponses
    @Post(value = "/save")
    public User createUser(@Body @Valid User user) {
        return service.save(user);
    }

}