package github.sagubr.repositories;

import github.sagubr.entities.Facility;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;

import java.util.UUID;

@Introspected
@Repository
public interface FacilityRepository extends JpaRepository<Facility, UUID> {
}
