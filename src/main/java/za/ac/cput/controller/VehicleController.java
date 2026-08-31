package za.ac.cput.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Vehicle;
import za.ac.cput.service.VehicleService;

import java.util.List;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    private final VehicleService  vehicleService;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    // Creates a new vehicle using the vehicle service layer.
    @PostMapping("/create")
    public Vehicle create(@RequestBody Vehicle vehicle) {
        return vehicleService.create(vehicle);
    }

    // Retrieves a vehicle using the vehicle's ID.
    @GetMapping("/read/{vehicleId}")
    public Vehicle read(@PathVariable("vehicleId") String vehicleId) {
        return vehicleService.read(vehicleId);
    }

    // Updates an existing vehicle's details using the vehicle service layer.
    @PutMapping("/update")
    public Vehicle update(@RequestBody Vehicle vehicle) {
        return vehicleService.update(vehicle);
    }

    // Deletes a vehicle using the vehicle's ID.
    @DeleteMapping("/delete/{vehicleId}")
    public void delete(@PathVariable("vehicleId") String vehicleId) {
        vehicleService.delete(vehicleId);
    }

    // Retrieves the full list of vehicles currently stored in the system.
    @GetMapping("/getAll")
    public List<Vehicle> getAll() {
        return vehicleService.findAll();
    }
}