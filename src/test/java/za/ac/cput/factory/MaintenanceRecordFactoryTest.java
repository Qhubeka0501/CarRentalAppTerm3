package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.MaintenanceRecord;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class MaintenanceRecordFactoryTest {

    @Test
    void createMaintenanceRecord() {

        LocalDate date = LocalDate.of(2026, 7, 12);

        MaintenanceRecord record =
                MaintenanceRecordFactory.createMaintenanceRecord(
                        "VEH001",
                        date,
                        "Oil change",
                        1500.00,
                        "John Smith"
                );

        assertNotNull(record);
        assertNotNull(record.getRecordId());

        assertEquals("VEH001", record.getVehicleId());
        assertEquals(date, record.getDate());
        assertEquals("Oil change", record.getDescription());
        assertEquals(1500.00, record.getCost());
        assertEquals("John Smith", record.getTechnicianName());
    }

    @Test
    void createMaintenanceRecordWithStringDate() {

        MaintenanceRecord record =
                MaintenanceRecordFactory.createMaintenanceRecord(
                        "VEH002",
                        "Brake inspection",
                        "2026-07-12",
                        800.00
                );

        assertNotNull(record);
        assertNotNull(record.getRecordId());

        assertEquals("VEH002", record.getVehicleId());
        assertEquals(
                LocalDate.of(2026, 7, 12),
                record.getDate()
        );
        assertEquals("Brake inspection", record.getDescription());
        assertEquals(800.00, record.getCost());
        assertEquals("Not specified", record.getTechnicianName());
    }
}

