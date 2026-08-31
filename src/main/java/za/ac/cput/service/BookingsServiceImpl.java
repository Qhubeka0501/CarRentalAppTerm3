package za.ac.cput.service;

import org.springframework.stereotype.Service;
import za.ac.cput.domain.Bookings;
import za.ac.cput.repository.BookingsRepository;

import java.util.List;

@Service
public class BookingsServiceImpl implements BookingsService {

    private final BookingsRepository repository;

    public BookingsServiceImpl(BookingsRepository repository) {
        this.repository = repository;
    }

    @Override
    public Bookings create(Bookings bookings) {
        return repository.save(bookings);
    }

    @Override
    public Bookings read(String bookingId) {
        return repository.findById(bookingId).orElse(null);
    }

    @Override
    public Bookings update(Bookings bookings) {
        return repository.save(bookings);
    }

    @Override
    public boolean delete(String bookingId) {
        if (repository.existsById(bookingId)) {
            repository.deleteById(bookingId);
            return true;
        }
        return false;
    }

    @Override
    public List<Bookings> findAll() {
        return repository.findAll();
    }
}
