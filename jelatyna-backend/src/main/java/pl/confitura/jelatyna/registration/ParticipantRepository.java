package pl.confitura.jelatyna.registration;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource(path = "participants")
public interface ParticipantRepository extends Repository<Participant, String> {
    @RestResource(exported = false)
    Participant save(Participant participant);

    @PreAuthorize("@security.isAdmin()")
    Iterable<Participant> findAll();

    Participant findOne(String id);

    @RestResource(exported = false)
    @Query("FROM Participant WHERE registrationDate IS NULL")
    Iterable<Participant> findAllUnregistered();
}
