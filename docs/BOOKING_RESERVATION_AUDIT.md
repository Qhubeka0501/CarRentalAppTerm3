# CareRentSystem Booking/Reservation Audit

## Scope
This update was limited to the booking/reservation area of the existing project. Unrelated domain classes, repositories, services, controllers, factories and configuration were left unchanged.

## Decision

### `Bookings` — JPA Entity
`Bookings` represents a persistent business record with its own identity (`bookingId`) and lifecycle (`PENDING`, `CONFIRMED`, `CANCELLED`). It also contains rental/return dates, payment state, customer ID and vehicle ID. The existing application uses `bookingId` in `Payment` and `Notification`, which supports treating a booking as a first-class business record.

The existing `String` ID design was preserved. The domain constructor continues to generate a UUID when an ID is not supplied, so a generated-value strategy was not introduced that would conflict with the existing String/UUID design.

JPA additions:
- `@Entity`
- `@Table(name = "bookings")`
- `@Id`
- protected no-argument constructor required by JPA

The existing Builder, validation, business methods and `copy()` method were preserved.

### `Reservation` — removed
`Reservation` duplicated much of the responsibility and data of `Bookings` and had no repository, service, controller or factory integration in the supplied project. It was not a JPA entity and was not referenced elsewhere in the application. Because the requested model now uses `Bookings` as the single booking concept, `Reservation.java` and its isolated `ReservationTest.java` were removed.

## Booking application-layer support added
Only the affected booking chain was added:
- `BookingsFactory`
- `BookingsRepository`
- `BookingsService`
- `BookingsServiceImpl`
- `BookingsController`

These follow the same Factory → Builder and Repository → Service → Controller patterns already used by the project.

## Payment and Notification
`Payment.bookingId` and `Notification.bookingId` remain scalar `String` IDs. They were not converted into new JPA associations because doing so would change the existing application API and architecture without evidence that such a relationship was required. Their existing booking-ID linkage is preserved.

## Tests added
- `BookingsTest`
- `BookingsFactoryTest`
- `BookingsRepositoryTest`

The repository test verifies persistence through Spring Boot/JPA.

## UML
The existing UML was updated only to include the newly persisted `Bookings` concept and its existing ID-based links to Customer and Vehicle. No unrelated UML elements were redesigned.

## Build verification
Maven could not be executed in the supplied environment because the `mvn` command is not installed and the project does not contain Maven Wrapper files. Therefore no claim of a successful Maven build/test run is made here.
