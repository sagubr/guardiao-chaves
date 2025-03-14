package github.sagubr.controller;

import github.sagubr.annotations.DefaultResponses;
import github.sagubr.entities.JobTitle;
import github.sagubr.entities.Requester;
import github.sagubr.services.JobTitleService;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Secured(SecurityRule.IS_AUTHENTICATED)
@Tag(name = "JobTitle", description = "Operações relacionadas a entidade cargo")
@RequiredArgsConstructor
@Controller("/api/job-title")
public class JobTitleController {

    private final JobTitleService service;

    @Operation(summary = "Obter todos os cargos")
    @DefaultResponses
    @Get
    public List<JobTitle> findAllJobTitle() {
        return service.findAll();
    }

    @Operation(summary = "Criar novo cargo")
    @DefaultResponses
    @Post(value = "/save")
    public JobTitle createJobTitle(@Body @Valid JobTitle jobTitle) {
        return service.save(jobTitle);
    }

    //TODO: lembrar de atualizar as requests de update para PATCH e atualizar o frontend para enviar apenas os dados atualizados. Do modo que está hoje, precisa enviar todos os dados, o que deixa a requisiç~]ao maior.
    @Operation(summary = "Atualizar um registro na classe cargo")
    @DefaultResponses
    @Patch("/update")
    public JobTitle updateJobTitle(@Body @Valid JobTitle resource) {
        return service.update(resource);
    }

}
