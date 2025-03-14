package github.sagubr.controller;

import github.sagubr.annotations.DefaultResponses;
import github.sagubr.entities.Facility;
import github.sagubr.entities.JobTitle;
import github.sagubr.entities.Location;
import github.sagubr.services.FacilityService;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Secured(SecurityRule.IS_AUTHENTICATED)
@Tag(name = "Facility", description = "Operações relacionadas a entidade lugar")
@RequiredArgsConstructor
@Controller("/api/facility")
public class FacilityController {

    private final FacilityService service;

    @Operation(summary = "Obter todas as instalações")
    @DefaultResponses
    @Get
    public List<Facility> findAllFacilities() {
        return service.findAll();
    }

    @Operation(summary = "Criar nova instalação")
    @DefaultResponses
    @Post(value = "/save")
    public Facility createFacility(@Body @Valid Facility resource) {
        return service.save(resource);
    }

    @Operation(summary = "Atualizar um registro na classe instalação")
    @DefaultResponses
    @Patch("/update")
    public Facility updateFacility(@Body @Valid Facility resource) {
        return service.update(resource);
    }

}
