# CareRent Presentation Layer

This project now includes a complete browser-based presentation layer built with plain HTML, CSS and JavaScript on top of the existing Spring Boot REST architecture.

## Architecture preserved

The existing backend structure is unchanged by this presentation-layer completion:

Presentation (HTML/CSS/JavaScript) -> Controller -> Service -> Repository -> MySQL

No Domain, Factory, Repository, Service, Controller, Maven or database configuration files were modified as part of this UI completion.

## Presentation pages

- `/` - public landing page
- `/login.html` - staff sign-in
- `/dashboard.html` - management dashboard
- `/vehicles.html` - vehicle CRUD and filtering
- `/customers.html` - customer CRUD including address and next-of-kin fields
- `/bookings.html` - booking CRUD with customer/vehicle selection
- `/payments.html` - payment CRUD and summaries
- `/maintenance.html` - maintenance record CRUD
- `/staff.html` - employee, manager and role management
- `/reviews.html` - review CRUD and rating summaries
- `/notifications.html` - notification CRUD and filtering

## UI features

- Responsive modern layout
- Shared sidebar and top navigation
- Session check on management pages
- Logout from every management page
- Dashboard summary cards and recent bookings
- Search and filters on management tables
- Modal create/edit forms
- Delete confirmations
- Toast success/error messages
- Status badges and empty states
- Mobile navigation

## Existing REST endpoints used

The UI connects directly to the existing controllers, including:

- `/login/*`
- `/vehicle/*`
- `/customer/*`
- `/bookings/*`
- `/payment/*`
- `/maintenanceRecord/*`
- `/employee/*`
- `/manager/*`
- `/role/*`
- `/review/*`
- `/notification/*`

## Run

1. Start MySQL and ensure the configured `car_rental_db` database is available.
2. Open a terminal in the project root.
3. Run the application using your existing working command:

```powershell
mvn spring-boot:run "-Dmaven.test.skip=true"
```

4. Open:

`http://localhost:8080/`

Then sign in with an employee account already stored in your database.

## Verification performed during UI completion

- All JavaScript presentation files were syntax-checked with Node.js.
- All HTML pages were parsed and checked for missing local JavaScript/CSS references.
- A direct comparison against the uploaded project confirmed that this completion only changes/adds presentation-layer files under `src/main/resources/static`, plus this documentation file.

The build itself was not run in the editing environment because Maven is not installed there; the user's existing local Maven setup should be used to run the project.
