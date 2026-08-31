package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Vehicle;

/*
 * Class Name: VehicleRepository
 * Description: Vehicle Repository for CarRentSystem
 * Author: Qhubekani Shandu (231316267)
 * Date: 04 August 2026
 */

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {

}