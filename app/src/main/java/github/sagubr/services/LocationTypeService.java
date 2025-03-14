package github.sagubr.services;

import github.sagubr.entities.LocationType;
import github.sagubr.repositories.LocationTypeRepository;
import io.micronaut.data.exceptions.EmptyResultException;
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
public class LocationTypeService {

    private final LocationTypeRepository repository;

    @Transactional(readOnly = true)
    public List<LocationType> findAll() throws EmptyResultException {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public LocationType findById(@NotBlank @NotNull UUID id) throws EmptyResultException {
        return repository.findById(id).orElseThrow(() -> new EmptyResultException());
    }

    @Transactional
    public LocationType save(@NotNull LocationType resource) {
        return repository.save(resource);
    }

    @Transactional
    public LocationType update(@NotNull LocationType resource) {
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
                .orElseThrow(() -> new EntityNotFoundException("Tipo de Ambiente não encontrado na base de dados."));
    }

}
