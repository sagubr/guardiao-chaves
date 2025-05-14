package github.sagubr.services;

import github.sagubr.entities.User;
import github.sagubr.exceptions.UserNotFoundException;
import github.sagubr.mail.EmailTemplate;
import github.sagubr.mail.SendGridEmailService;
import github.sagubr.mappers.UserMapper;
import github.sagubr.models.UserAuthenticateDto;
import github.sagubr.models.UserSummaryDto;
import github.sagubr.repositories.UserRepository;
import github.sagubr.security.PasswordEncoder;
import github.sagubr.security.PasswordGenerator;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.data.exceptions.EmptyResultException;
import io.micronaut.transaction.annotation.ReadOnly;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.security.Principal;
import java.util.*;

@Singleton
public class UserService {

    private final UserRepository repository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final SendGridEmailService sendGridEmailService;

    @Inject
    public UserService(
            UserRepository repository,
            UserMapper mapper,
            PasswordEncoder passwordEncoder,
            SendGridEmailService sendGridEmailService
    ) {
        this.repository = repository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.sendGridEmailService = sendGridEmailService;
    }

    @Transactional
    public List<UserSummaryDto> findAllUserSummaries() {
        return repository.findAllUserSummaries();
    }

    @Transactional(readOnly = true)
    public List<User> findByActiveTrueOrderByCreatedAtDesc() {
        return repository.findByActiveTrueOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public Optional<UserAuthenticateDto> findByUsername(String username) {
        return Optional.of(repository.findByUsername(username)
                        .orElseThrow(() -> new NoSuchElementException("User with username " + username + " not found")))
                .map(mapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<User> findByUsername(Principal principal) throws UserNotFoundException {
        String username = principal.getName();
        return Optional.ofNullable(repository.findByUsername(username)).orElseThrow();
    }

    @Transactional
    public User update(User user) {
        return repository.findById(user.getId())
                .map(existing -> {
                    existing.setUsername(user.getUsername());
                    existing.setEmail(user.getEmail());
                    existing.setName(user.getName());
                    existing.setAssignment(user.getAssignment());
                    return repository.update(existing);
                }).orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado na base de dados."));
    }

    @Transactional
    public User save(@NotNull User user) {
        String temporaryPassword = PasswordGenerator.generate(8);
        user.setPassword(passwordEncoder.encode(temporaryPassword));
        User saved = repository.save(user);
        if (saved.isFirstAccess()) {
            this.sendGridEmailService.send(saved.getEmail(), EmailTemplate.BEM_VINDO, Map.of("name", saved.getName(), "password", temporaryPassword)).subscribe();
        }
        return saved;
    }

    @Transactional
    public User resetPassword(@NotNull String username) {
        Optional<User> user = repository.findByUsername(username);
        String temporaryPassword = PasswordGenerator.generate(8);
        user.get().setPassword(passwordEncoder.encode(temporaryPassword));
        User saved = repository.update(user.get());
        this.sendGridEmailService.send(saved.getEmail(), EmailTemplate.REDEFINIR_SENHA, Map.of("name", saved.getName(), "password", temporaryPassword)).subscribe();
        return saved;
    }
}

