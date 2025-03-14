package github.sagubr.services;

import github.sagubr.entities.Facility;
import github.sagubr.repositories.FacilityRepository;
import io.micronaut.data.exceptions.EmptyResultException;
import io.micronaut.transaction.annotation.ReadOnly;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Singleton
public class FacilityService {

    private final FacilityRepository repository;

    @Transactional(readOnly = true)
    public List<Facility> findAll() throws EmptyResultException {
        List<Facility> result = repository.findAll();
        if (result.isEmpty()) {
            throw new EmptyResultException();
        }
        return result;
    }

    @ReadOnly
    @Transactional
    public Facility findById(@NotBlank @NotNull UUID id) throws EmptyResultException {
        return repository.findById(id).orElseThrow(() -> new EmptyResultException());
    }

    @Transactional
    public Facility save(@NotNull Facility entity) {
        try {
            return repository.save(entity);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while saving the entity.", e);
        }
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
    public void delete(@NotNull Facility entity) {
        try {
            repository.delete(entity);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while deleting the entity.", e);
        }
    }

    @Transactional
    public Facility update(@NotNull Facility resource) {
        return repository.findById(resource.getId())
                .map(existing -> {

                    List<Object> existingHistory = existing.getHistory();

                    if (existingHistory == null) {
                        existingHistory = new ArrayList<>();
                    }

                    Object newHistoryItem = Map.of(
                            "timestamp", Instant.now().toString(),
                            "entidade", Map.of(
                                    "id", existing.getId(),
                                    "name", existing.getName(),
                                    "description", existing.getDescription()
                            )
                    );

                    existingHistory.add(newHistoryItem);

                    existing.setHistory(existingHistory);
                    existing.setDescription(resource.getDescription());
                    existing.setName(resource.getName());
                    return repository.update(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Instalação não encontrado na base de dados."));
    }

}
