package za.ac.cput.service;

import za.ac.cput.domain.MaintenanceRecord;
import za.ac.cput.domain.Review;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface MaintenanceRecordService extends IService<MaintenanceRecord, String> {
    List<MaintenanceRecord> findAll();
}



