package za.ac.cput.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Bookings;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BookingsRepositoryTest {

    @Autowired
    private BookingsRepository repository;

    @Test
    void savesAndReadsBooking() {
        Bookings booking = new Bookings.Builder()
                .setBookingId("B-REPO-001")
                .setCustomerId("C001")
                .setVehicleId("V001")
                .setRentalDate(LocalDate.of(2026, 8, 28))
                .setReturnDate(LocalDate.of(2026, 8, 30))
                .build();

        repository.save(booking);

        Bookings saved = repository.findById("B-REPO-001").orElse(null);

        assertNotNull(saved);
        assertEquals("B-REPO-001", saved.getBookingId());

        repository.deleteById("B-REPO-001");
    }
}
