package github.sagubr.services;

import github.sagubr.entities.JobTitle;
import github.sagubr.repositories.JobTitleRepository;
import io.micronaut.cache.annotation.CacheInvalidate;
import io.micronaut.data.exceptions.EmptyResultException;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.*;

@RequiredArgsConstructor
@Singleton
public class JobTitleService {

    private final JobTitleRepository repository;

    @Transactional(readOnly = true)
    public List<JobTitle> findAll() throws EmptyResultException {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public JobTitle findById(@NotBlank @NotNull UUID id) throws EmptyResultException {
        return repository.findById(id).orElseThrow(() -> new EmptyResultException());
    }

    @Transactional
    public JobTitle save(@NotNull JobTitle entity) {
        return repository.save(entity);
    }

    @Transactional
    public JobTitle update(@NotNull JobTitle entity) {
        return repository.findById(entity.getId())
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
                    existing.setDescription(entity.getDescription());
                    existing.setName(entity.getName());
                    return repository.update(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Cargo não encontrado na base de dados."));
    }
}
