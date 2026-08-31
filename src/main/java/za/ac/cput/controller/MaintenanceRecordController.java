package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.MaintenanceRecord;
import za.ac.cput.service.MaintenanceRecordService;

import java.util.List;

@RestController
@RequestMapping("/maintenanceRecord")
public class MaintenanceRecordController {

    private MaintenanceRecordService maintenanceRecordService;

    @Autowired
    public MaintenanceRecordController(MaintenanceRecordService maintenanceRecordService) {
        this.maintenanceRecordService = maintenanceRecordService;
    }

    @PostMapping("/create")
    public MaintenanceRecord create(@RequestBody MaintenanceRecord maintenanceRecord) {
        return maintenanceRecordService.create(maintenanceRecord);
    }

    @GetMapping("/read/{maintenanceId}")
    public MaintenanceRecord read(@PathVariable("maintenanceId") String maintenanceId) {
        return maintenanceRecordService.read(maintenanceId);
    }

    @PutMapping("/update")
    public MaintenanceRecord update(@RequestBody MaintenanceRecord maintenanceRecord) {
        return maintenanceRecordService.update(maintenanceRecord);
    }

    @DeleteMapping("/delete/{maintenanceId}")
    public void delete(@PathVariable("maintenanceId") String maintenanceId) {
        maintenanceRecordService.delete(maintenanceId);
    }

    @GetMapping("/getAll")
    public List<MaintenanceRecord> getAll() {
        return maintenanceRecordService.findAll();
    }
}