package za.ac.cput.controller;

import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Bookings;
import za.ac.cput.service.BookingsService;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingsController {

    private final BookingsService bookingsService;

    public BookingsController(BookingsService bookingsService) {
        this.bookingsService = bookingsService;
    }

    @PostMapping("/create")
    public Bookings create(@RequestBody Bookings bookings) {
        return bookingsService.create(bookings);
    }

    @GetMapping("/read/{bookingId}")
    public Bookings read(@PathVariable("bookingId") String bookingId) {
        return bookingsService.read(bookingId);
    }

    @PutMapping("/update")
    public Bookings update(@RequestBody Bookings bookings) {
        return bookingsService.update(bookings);
    }

    @DeleteMapping("/delete/{bookingId}")
    public boolean delete(@PathVariable("bookingId") String bookingId) {
        return bookingsService.delete(bookingId);
    }

    @GetMapping("/getAll")
    public List<Bookings> getAll() {
        return bookingsService.findAll();
    }
}
