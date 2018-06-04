package pl.confitura.jelatyna.registration;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import pl.confitura.jelatyna.registration.voucher.Voucher;

@RepositoryRestResource(path = "participants")
public interface ParticipationRepository extends Repository<ParticipationData, String> {
    @RestResource(exported = false)
    ParticipationData save(ParticipationData participationData);

    @PreAuthorize("@security.isAdmin()")
    Iterable<ParticipationData> findAll();

    ParticipationData findById(String id);

    @RestResource(exported = false)
    @Query("FROM ParticipationData WHERE registrationDate IS NULL")
    Iterable<ParticipationData> findAllUnregistered();

    @RestResource(exported = false)
    @Query("FROM ParticipationData WHERE registrationDate IS NOT NULL")
    Iterable<ParticipationData> findAllRegistered();

    @RestResource(exported = false)
    Long count();


    @Query("SELECT count(p.id) FROM ParticipationData p WHERE registrationDate IS NOT NULL")
    @RestResource(exported = false)
    Long countRegistered();

    @Query("SELECT count(p.id) FROM ParticipationData p WHERE arrivalDate IS NOT NULL")
    @RestResource(exported = false)
    Long countArrived();

    @RestResource(exported = false)
    ParticipationData findByVoucher(Voucher voucher);

}