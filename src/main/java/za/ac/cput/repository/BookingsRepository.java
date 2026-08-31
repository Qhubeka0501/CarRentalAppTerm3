package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Bookings;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, String> {
}
