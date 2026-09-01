package za.ac.cput.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Employee;

/*
 * Class Name: EmployeeRepository
 * Description: EmployeeRepository CarRentalApp class
 * Author: Avuyile Twesha (240763394)
*/

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,String>{}