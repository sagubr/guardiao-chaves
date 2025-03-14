package github.sagubr.services;

import github.sagubr.entities.Key;
import github.sagubr.entities.Location;
import github.sagubr.repositories.KeyRepository;
import io.micronaut.data.exceptions.EmptyResultException;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@Singleton
public class KeyService {

    private final KeyRepository repository;

    @Transactional(readOnly = true)
    public List<Key> findAll() throws EmptyResultException {
        return repository.findAll();
    }

    @Transactional
    public Key save(@NotNull Key entity) {
        return repository.save(entity);
    }

    public List<Key> findByLocation(Location location) {
        return repository.findByLocation(location);
    }

    @Transactional
    public Key update(@NotNull Key resource) {
        return repository.findById(resource.getId())
                .map(existing -> {

                    List<Object> existingHistory = existing.getHistory();

                    if (existingHistory == null) {
                        existingHistory = new ArrayList<>();
                    }

                    Object newHistoryItem = Map.of(
                            "timestamp", Instant.now().toString(),
                            "entidade", Map.of(
                                    "description", Objects.requireNonNullElse(existing.getDescription(), "N/A")
                            )
                    );

                    existing.setDescription(resource.getDescription());

                    existingHistory.add(newHistoryItem);

                    return repository.update(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Chave não encontrada na base de dados."));
    }

}
