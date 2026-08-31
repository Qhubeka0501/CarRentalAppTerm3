package za.ac.cput.domain;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class BookingsTest {

    private Bookings createBooking() {
        return new Bookings.Builder()
                .setBookingId("B001")
                .setCustomerId("C001")
                .setVehicleId("V001")
                .setRentalDate(LocalDate.of(2026, 8, 28))
                .setReturnDate(LocalDate.of(2026, 8, 30))
                .build();
    }

    @Test
    void builderCreatesBooking() {
        Bookings booking = createBooking();

        assertEquals("B001", booking.getBookingId());
        assertEquals("C001", booking.getCustomerId());
        assertEquals("V001", booking.getVehicleId());
        assertEquals(BookingStatus.PENDING, booking.getBookingStatus());
        assertEquals(PaymentStatus.PENDING, booking.getPaymentStatus());
    }

    @Test
    void copyPreservesFields() {
        Bookings original = createBooking();
        Bookings copy = new Bookings.Builder().copy(original).build();

        assertEquals(original.getBookingId(), copy.getBookingId());
        assertEquals(original.getCustomerId(), copy.getCustomerId());
        assertEquals(original.getVehicleId(), copy.getVehicleId());
        assertEquals(original.getRentalDate(), copy.getRentalDate());
        assertEquals(original.getReturnDate(), copy.getReturnDate());
        assertEquals(original.getPaymentStatus(), copy.getPaymentStatus());
        assertEquals(original.getBookingStatus(), copy.getBookingStatus());
    }

    @Test
    void rejectsInvalidDates() {
        assertThrows(IllegalArgumentException.class, () ->
                new Bookings.Builder()
                        .setCustomerId("C001")
                        .setVehicleId("V001")
                        .setRentalDate(LocalDate.of(2026, 8, 30))
                        .setReturnDate(LocalDate.of(2026, 8, 28))
                        .build());
    }

    @Test
    void bookingCanChangeState() {
        Bookings booking = createBooking();

        booking.confirmBooking();
        assertEquals(BookingStatus.CONFIRMED, booking.getBookingStatus());

        booking.markPaid();
        assertEquals(PaymentStatus.PAID, booking.getPaymentStatus());

        booking.cancelBooking();
        assertEquals(BookingStatus.CANCELLED, booking.getBookingStatus());
    }
}
