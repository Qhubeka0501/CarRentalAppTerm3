package za.ac.cput.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import za.ac.cput.domain.MaintenanceRecord;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class MaintenanceRecordRepositoryTest {

    @Autowired
    private MaintenanceRecordRepository repository;

    @Test
    void saveMaintenanceRecord() {

        MaintenanceRecord record =
                new MaintenanceRecord.Builder()
                        .setRecordId("MR001")
                        .setVehicleId("VEH001")
                        .setDate(LocalDate.of(2026, 7, 12))
                        .setDescription("Oil change")
                        .setCost(1500.00)
                        .setTechnicianName("John Smith")
                        .build();

        MaintenanceRecord saved = repository.save(record);

        assertNotNull(saved);
        assertEquals("MR001", saved.getRecordId());
        assertEquals("VEH001", saved.getVehicleId());
        assertEquals("Oil change", saved.getDescription());
        assertEquals(1500.00, saved.getCost());
        assertEquals("John Smith", saved.getTechnicianName());
    }

    @Test
    void readMaintenanceRecord() {

        MaintenanceRecord record =
                new MaintenanceRecord.Builder()
                        .setRecordId("MR002")
                        .setVehicleId("VEH002")
                        .setDate(LocalDate.of(2026, 7, 13))
                        .setDescription("Brake inspection")
                        .setCost(800.00)
                        .setTechnicianName("Peter")
                        .build();

        repository.save(record);

        MaintenanceRecord found =
                repository.findById("MR002").orElse(null);

        assertNotNull(found);
        assertEquals("MR002", found.getRecordId());
        assertEquals("VEH002", found.getVehicleId());
        assertEquals("Brake inspection", found.getDescription());
    }

    @Test
    void deleteMaintenanceRecord() {

        MaintenanceRecord record =
                new MaintenanceRecord.Builder()
                        .setRecordId("MR003")
                        .setVehicleId("VEH003")
                        .setDate(LocalDate.of(2026, 7, 14))
                        .setDescription("Tyre replacement")
                        .setCost(2500.00)
                        .setTechnicianName("David")
                        .build();

        repository.save(record);

        repository.deleteById("MR003");

        assertFalse(repository.existsById("MR003"));
    }

    @Test
    void findAllMaintenanceRecords() {

        MaintenanceRecord record =
                new MaintenanceRecord.Builder()
                        .setRecordId("MR004")
                        .setVehicleId("VEH004")
                        .setDate(LocalDate.of(2026, 7, 15))
                        .setDescription("Engine check")
                        .setCost(3000.00)
                        .setTechnicianName("Mike")
                        .build();

        repository.save(record);

        var records = repository.findAll();

        assertNotNull(records);
        assertFalse(records.isEmpty());
    }
}

