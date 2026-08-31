package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.BookingStatus;
import za.ac.cput.domain.Bookings;
import za.ac.cput.domain.PaymentStatus;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class BookingsFactoryTest {

    @Test
    void createsBooking() {
        Bookings booking = BookingsFactory.createBooking(
                "B001", "C001", "V001",
                LocalDate.of(2026, 8, 28),
                LocalDate.of(2026, 8, 30),
                PaymentStatus.PENDING,
                BookingStatus.PENDING);

        assertNotNull(booking);
        assertEquals("B001", booking.getBookingId());
    }

    @Test
    void rejectsInvalidBooking() {
        assertNull(BookingsFactory.createBooking(
                "B001", null, "V001",
                LocalDate.of(2026, 8, 28),
                LocalDate.of(2026, 8, 30),
                PaymentStatus.PENDING,
                BookingStatus.PENDING));
    }
}
