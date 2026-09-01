package za.ac.cput.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import za.ac.cput.domain.MaintenanceRecord;
import za.ac.cput.repository.MaintenanceRecordRepository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MaintenanceRecordServiceImplTest {

    @Mock
    private MaintenanceRecordRepository repository;

    @InjectMocks
    private MaintenanceRecordServiceImpl service;

    private MaintenanceRecord record;

    @BeforeEach
    void setUp() {

        MockitoAnnotations.openMocks(this);

        record = new MaintenanceRecord.Builder()
                .setRecordId("MR001")
                .setVehicleId("VEH001")
                .setDate(LocalDate.of(2026, 7, 12))
                .setDescription("Oil change")
                .setCost(1500.00)
                .setTechnicianName("John Smith")
                .build();
    }

    @Test
    void create() {

        when(repository.save(record))
                .thenReturn(record);

        MaintenanceRecord result =
                service.create(record);

        assertNotNull(result);
        assertEquals("MR001", result.getRecordId());

        verify(repository).save(record);
    }

    @Test
    void read() {

        when(repository.findById("MR001"))
                .thenReturn(Optional.of(record));

        MaintenanceRecord result =
                service.read("MR001");

        assertNotNull(result);
        assertEquals("MR001", result.getRecordId());

        verify(repository).findById("MR001");
    }

    @Test
    void update() {

        when(repository.save(record))
                .thenReturn(record);

        MaintenanceRecord result =
                service.update(record);

        assertNotNull(result);
        assertEquals("MR001", result.getRecordId());

        verify(repository).save(record);
    }

    @Test
    void deleteWhenExists() {

        when(repository.existsById("MR001"))
                .thenReturn(true);

        boolean result =
                service.delete("MR001");

        assertTrue(result);

        verify(repository).existsById("MR001");
        verify(repository).deleteById("MR001");
    }

    @Test
    void deleteWhenNotExists() {

        when(repository.existsById("MR001"))
                .thenReturn(false);

        boolean result =
                service.delete("MR001");

        assertFalse(result);

        verify(repository).existsById("MR001");

        verify(repository, never())
                .deleteById("MR001");
    }

    @Test
    void findAll() {

        when(repository.findAll())
                .thenReturn(Arrays.asList(record));

        var result = service.findAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(
                "MR001",
                result.get(0).getRecordId()
        );

        verify(repository).findAll();
    }
}