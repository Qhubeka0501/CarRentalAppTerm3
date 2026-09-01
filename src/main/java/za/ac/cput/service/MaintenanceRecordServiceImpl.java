package za.ac.cput.service;

import org.springframework.stereotype.Service;
import za.ac.cput.domain.MaintenanceRecord;
import za.ac.cput.repository.MaintenanceRecordRepository;

import java.util.List;
/*
 * Class Name: ReviewServiceImpl
 * Description: ReviewService implementation for CarRentSystem
 * Author: Alphonsine Ningabiye (230426581)
 * Date: 12 July 2026
 */

@Service
public class MaintenanceRecordServiceImpl implements MaintenanceRecordService {

    private final MaintenanceRecordRepository repository;

    public MaintenanceRecordServiceImpl(MaintenanceRecordRepository repository) {
        this.repository = repository;
    }

    @Override
    public MaintenanceRecord create(MaintenanceRecord maintenanceRecord) {

        return repository.save(maintenanceRecord);
    }

    @Override
    public MaintenanceRecord read(String recordId) {
        return repository.findById(recordId).orElse(null);
    }

    @Override
    public MaintenanceRecord update(MaintenanceRecord maintenanceRecord) {
        return repository.save(maintenanceRecord);
    }

    @Override
    public boolean delete(String recordId) {
        if (repository.existsById(recordId)) {
            repository.deleteById(recordId);
            return true;
        }
        return false;
    }

    @Override
    public List<MaintenanceRecord> findAll() {
        return repository.findAll();
    }
}