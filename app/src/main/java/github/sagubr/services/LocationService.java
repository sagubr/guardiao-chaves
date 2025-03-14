package github.sagubr.services;

import github.sagubr.entities.Location;
import github.sagubr.repositories.LocationRepository;
import io.micronaut.data.exceptions.EmptyResultException;
import io.micronaut.transaction.annotation.ReadOnly;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.*;

@Singleton
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository repository;

    @Transactional(readOnly = true)
    public List<Location> findAll() throws EmptyResultException {
        return repository.findAll();
    }

    @ReadOnly
    @Transactional
    public Location findById(@NotBlank @NotNull UUID id) throws EmptyResultException {
        return repository.findById(id).orElseThrow(() -> new EmptyResultException());
    }

    @Transactional
    public Location save(@NotNull Location resource) {
        return repository.save(resource);
    }

    @Transactional
    public void deleteById(@NotBlank @NotNull UUID id) {
        try {
            repository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while deleting the record with ID: " + id, e);
        }
    }

    @Transactional
    public Location update(@NotNull Location resource) {
        return repository.findById(resource.getId())
                .map(existing -> {

                    List<Object> existingHistory = existing.getHistory();

                    if (existingHistory == null) {
                        existingHistory = new ArrayList<>();
                    }

                    Object newHistoryItem = Map.of(
                            "timestamp", Instant.now().toString(),
                            "entidade", Map.of(
                                    "name", Objects.requireNonNullElse(existing.getName(), "N/A"),
                                    "description", Objects.requireNonNullElse(existing.getDescription(), "N/A"),
                                    "locationType", Objects.requireNonNullElse(existing.getLocationType(), "N/A"),
                                    "facility", Objects.requireNonNullElse(existing.getFacility(), "N/A"),
                                    "publicAccess", existing.isPublicAccess(),
                                    "responsibles", Objects.requireNonNullElse(existing.getResponsibles(), List.of()),
                                    "maxCapacity", Objects.requireNonNullElse(existing.getMaxCapacity(), 0),
                                    "restricted", existing.isRestricted()
                            )
                    );

                    existing.setName(resource.getName());
                    existing.setDescription(resource.getDescription());
                    existing.setLocationType(resource.getLocationType());
                    existing.setFacility(resource.getFacility());
                    existing.setPublicAccess(resource.isPublicAccess());
                    existing.setResponsibles(resource.getResponsibles());
                    existing.setMaxCapacity(resource.getMaxCapacity());
                    existing.setRestricted(resource.isRestricted());
                    existing.setOpeningTime(resource.getOpeningTime());
                    existing.setClosingTime(resource.getClosingTime());

                    existingHistory.add(newHistoryItem);

                    return repository.update(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Localização não encontrado na base de dados."));
    }

    public List<Location> findByRestrictedFalseAndPublicFalse() {
        return repository.findByRestrictedFalseAndPublicAccessFalse();
    }

    public List<Location> findByRestrictedFalseAndPublicTrue() {
        return repository.findByRestrictedFalseAndPublicAccessTrue();
    }

    public List<Location> findByResponsiblesId(UUID requesterId) {
        return repository.findByResponsiblesId(requesterId);
    }

}
