package github.sagubr.repositories;

import github.sagubr.entities.User;
import github.sagubr.models.UserSummaryDto;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Introspected
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUsername(String username);

    List<User> findByActiveTrueOrderByCreatedAtDesc();

    @Query("SELECT new github.sagubr.models.UserSummaryDto(u.name, u.username, u.email, a.name) FROM User u JOIN u.assignment a")
    List<UserSummaryDto> findAllUserSummaries();

}
