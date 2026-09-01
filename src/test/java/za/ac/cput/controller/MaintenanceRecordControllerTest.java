package za.ac.cput.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import za.ac.cput.domain.MaintenanceRecord;
import za.ac.cput.service.MaintenanceRecordService;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MaintenanceRecordControllerTest {

    @Mock
    private MaintenanceRecordService maintenanceRecordService;

    @InjectMocks
    private MaintenanceRecordController maintenanceRecordController;

    private MaintenanceRecord maintenanceRecord;

    @BeforeEach
    void setUp() {

        maintenanceRecord = new MaintenanceRecord.Builder()
                .setRecordId("M001")
                .setVehicleId("V001")
                .setDate(LocalDate.of(2026, 7, 12))
                .setDescription("Oil change and vehicle inspection")
                .setCost(1500.00)
                .setTechnicianName("John Smith")
                .build();
    }

    @Test
    void create() {

        when(maintenanceRecordService.create(maintenanceRecord))
                .thenReturn(maintenanceRecord);

        MaintenanceRecord result =
                maintenanceRecordController.create(maintenanceRecord);

        assertNotNull(result);
        assertEquals("M001", result.getRecordId());
        assertEquals("V001", result.getVehicleId());
        assertEquals("Oil change and vehicle inspection",
                result.getDescription());
        assertEquals(1500.00, result.getCost());
        assertEquals("John Smith", result.getTechnicianName());

        verify(maintenanceRecordService, times(1))
                .create(maintenanceRecord);
    }

    @Test
    void read() {

        when(maintenanceRecordService.read("M001"))
                .thenReturn(maintenanceRecord);

        MaintenanceRecord result =
                maintenanceRecordController.read("M001");

        assertNotNull(result);
        assertEquals("M001", result.getRecordId());
        assertEquals("V001", result.getVehicleId());

        verify(maintenanceRecordService, times(1))
                .read("M001");
    }

    @Test
    void update() {

        MaintenanceRecord updatedRecord =
                new MaintenanceRecord.Builder()
                        .copy(maintenanceRecord)
                        .setDescription("Oil change completed")
                        .setCost(1800.00)
                        .build();

        when(maintenanceRecordService.update(updatedRecord))
                .thenReturn(updatedRecord);

        MaintenanceRecord result =
                maintenanceRecordController.update(updatedRecord);

        assertNotNull(result);
        assertEquals("M001", result.getRecordId());
        assertEquals("Oil change completed",
                result.getDescription());
        assertEquals(1800.00, result.getCost());

        verify(maintenanceRecordService, times(1))
                .update(updatedRecord);
    }

    @Test
    void delete() {

        doNothing()
                .when(maintenanceRecordService)
                .delete("M001");

        maintenanceRecordController.delete("M001");

        verify(maintenanceRecordService, times(1))
                .delete("M001");
    }

    @Test
    void getAll() {

        List<MaintenanceRecord> records =
                List.of(maintenanceRecord);

        when(maintenanceRecordService.findAll())
                .thenReturn(records);

        List<MaintenanceRecord> result =
                maintenanceRecordController.getAll();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());

        assertEquals("M001",
                result.get(0).getRecordId());

        verify(maintenanceRecordService, times(1))
                .findAll();
    }
}