package za.ac.cput.service;

import za.ac.cput.domain.Bookings;

import java.util.List;

public interface BookingsService extends IService<Bookings, String> {
    List<Bookings> findAll();
}
