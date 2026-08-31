package za.ac.cput.factory;

import za.ac.cput.domain.BookingStatus;
import za.ac.cput.domain.Bookings;
import za.ac.cput.domain.PaymentStatus;

import java.time.LocalDate;

public class BookingsFactory {

    public static Bookings createBooking(
            String bookingId,
            String customerId,
            String vehicleId,
            LocalDate rentalDate,
            LocalDate returnDate,
            PaymentStatus paymentStatus,
            BookingStatus bookingStatus) {

        if (customerId == null || customerId.trim().isEmpty()
                || vehicleId == null || vehicleId.trim().isEmpty()
                || rentalDate == null
                || returnDate == null
                || returnDate.isBefore(rentalDate)) {
            return null;
        }

        return new Bookings.Builder()
                .setBookingId(bookingId)
                .setCustomerId(customerId)
                .setVehicleId(vehicleId)
                .setRentalDate(rentalDate)
                .setReturnDate(returnDate)
                .setPaymentStatus(paymentStatus)
                .setBookingStatus(bookingStatus)
                .build();
    }
}
