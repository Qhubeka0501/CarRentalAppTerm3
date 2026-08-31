package za.ac.cput.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "bookings")
public class Bookings {

    @Id
    private String bookingId;

    /*
     * The existing project uses String IDs for customerId and vehicleId.
     * They are intentionally preserved as scalar IDs rather than introducing
     * new JPA relationships that would change the existing architecture.
     */
    private String customerId;
    private String vehicleId;
    private LocalDate rentalDate;
    private LocalDate returnDate;
    private PaymentStatus paymentStatus;
    private BookingStatus bookingStatus;

    // Required by JPA.
    protected Bookings() {
    }

    private Bookings(Builder builder) {
        if (builder.customerId == null || builder.vehicleId == null) {
            throw new IllegalArgumentException("Customer and Vehicle are required");
        }

        if (builder.rentalDate == null || builder.returnDate == null) {
            throw new IllegalArgumentException("Rental and return dates are required");
        }

        if (builder.returnDate.isBefore(builder.rentalDate)) {
            throw new IllegalArgumentException("Return date cannot be before rental date");
        }

        this.bookingId = builder.bookingId == null
                ? UUID.randomUUID().toString()
                : builder.bookingId;
        this.customerId = builder.customerId;
        this.vehicleId = builder.vehicleId;
        this.rentalDate = builder.rentalDate;
        this.returnDate = builder.returnDate;
        this.paymentStatus = builder.paymentStatus == null
                ? PaymentStatus.PENDING
                : builder.paymentStatus;
        this.bookingStatus = builder.bookingStatus == null
                ? BookingStatus.PENDING
                : builder.bookingStatus;
    }

    public void confirmBooking() {
        if (bookingStatus == BookingStatus.CANCELLED) {
            throw new IllegalStateException("Cannot confirm a cancelled booking");
        }
        this.bookingStatus = BookingStatus.CONFIRMED;
    }

    public void cancelBooking() {
        this.bookingStatus = BookingStatus.CANCELLED;
    }

    public void markPaid() {
        this.paymentStatus = PaymentStatus.PAID;
    }

    public String getBookingId() {
        return bookingId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getVehicleId() {
        return vehicleId;
    }

    public LocalDate getRentalDate() {
        return rentalDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public BookingStatus getBookingStatus() {
        return bookingStatus;
    }

    public static class Builder {
        private String bookingId;
        private String customerId;
        private String vehicleId;
        private LocalDate rentalDate;
        private LocalDate returnDate;
        private PaymentStatus paymentStatus;
        private BookingStatus bookingStatus;

        public Builder setBookingId(String bookingId) {
            this.bookingId = bookingId;
            return this;
        }

        public Builder setCustomerId(String customerId) {
            this.customerId = customerId;
            return this;
        }

        public Builder setVehicleId(String vehicleId) {
            this.vehicleId = vehicleId;
            return this;
        }

        public Builder setRentalDate(LocalDate rentalDate) {
            this.rentalDate = rentalDate;
            return this;
        }

        public Builder setReturnDate(LocalDate returnDate) {
            this.returnDate = returnDate;
            return this;
        }

        public Builder setPaymentStatus(PaymentStatus paymentStatus) {
            this.paymentStatus = paymentStatus;
            return this;
        }

        public Builder setBookingStatus(BookingStatus bookingStatus) {
            this.bookingStatus = bookingStatus;
            return this;
        }

        public Builder copy(Bookings bookings) {
            this.bookingId = bookings.bookingId;
            this.customerId = bookings.customerId;
            this.vehicleId = bookings.vehicleId;
            this.rentalDate = bookings.rentalDate;
            this.returnDate = bookings.returnDate;
            this.paymentStatus = bookings.paymentStatus;
            this.bookingStatus = bookings.bookingStatus;
            return this;
        }

        public Bookings build() {
            return new Bookings(this);
        }
    }
}
