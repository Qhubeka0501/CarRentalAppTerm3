package za.ac.cput.factory;
import za.ac.cput.domain.MaintenanceRecord;
import java.time.LocalDate;

/*
 * Class Name: ReviewServiceImpl
 * Description: ReviewService implementation for CarRentSystem
 * Author: Alphonsine Ningabiye (230426581)
 * Date: 12 July 2026
 */

public class MaintenanceRecordFactory{
    public static MaintenanceRecord createMaintenanceRecord(String vehicleId,LocalDate date,String description,
                                                            double cost,String technicianName){
        return new MaintenanceRecord.Builder().setRecordId("MR"+System.currentTimeMillis()).
                setVehicleId(vehicleId)
                .setDate(date)
                .setDescription(description)
                .setCost(cost)
                .setTechnicianName(technicianName).build();
    }
    public static MaintenanceRecord createMaintenanceRecord(String vehicleId,String description,
                                                            String date,double cost){
        return createMaintenanceRecord(vehicleId,LocalDate.parse(date),
                description,cost,"Not specified");
    }
}