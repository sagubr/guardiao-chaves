package github.sagubr.services;

import github.sagubr.entities.Key;
import github.sagubr.entities.Location;
import github.sagubr.repositories.KeyRepository;
import io.micronaut.cache.annotation.CacheInvalidate;
import io.micronaut.data.exceptions.EmptyResultException;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

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
    @CacheInvalidate(value = "key-cache", all = true)
    public Key update(@NotNull Key entity) {
        return repository.findById(entity.getId())
                .map(existing -> {
                    existing.setDescription(entity.getDescription());
                    existing.setKeyType(entity.getKeyType());
                    return repository.update(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Chave não encontrada na base de dados."));
    }

}
