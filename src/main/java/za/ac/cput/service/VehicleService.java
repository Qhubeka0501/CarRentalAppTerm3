package za.ac.cput.service;

import za.ac.cput.domain.Vehicle;

import java.util.List;

/*
 * Class Name: VehicleService
 * Description: VehicleService interface for CarRentSystem
 * Author: Qhubekani Shandu (231316267)
 * Date: 04 August 2026
 */
public interface VehicleService extends IService<Vehicle, String> {

    List<Vehicle> findAll();

}