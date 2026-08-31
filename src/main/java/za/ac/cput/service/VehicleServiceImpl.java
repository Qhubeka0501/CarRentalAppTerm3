package za.ac.cput.service;

import org.springframework.stereotype.Service;
import za.ac.cput.domain.Vehicle;
import za.ac.cput.repository.VehicleRepository;

import java.util.List;

/*
 * Class Name: VehicleServiceImpl
 * Description: VehicleService implementation for CarRentSystem
 * Author: Qhubekani Shandu (231316267)
 * Date: 04 August 2026
 */
@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository repository;

    public VehicleServiceImpl(VehicleRepository repository) {
        this.repository = repository;
    }

    @Override
    public Vehicle create(Vehicle vehicle) {
        return repository.save(vehicle);
    }

    @Override
    public Vehicle read(String vehicleId) {
        return repository.findById(vehicleId).orElse(null);
    }

    @Override
    public Vehicle update(Vehicle vehicle) {
        return repository.save(vehicle);
    }

    @Override
    public boolean delete(String vehicleId) {
        if (repository.existsById(vehicleId)) {
            repository.deleteById(vehicleId);
            return true;
        }
        return false;
    }

    @Override
    public List<Vehicle> findAll() {
        return repository.findAll();
    }
}