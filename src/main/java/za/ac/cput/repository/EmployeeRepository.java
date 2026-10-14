package za.ac.cput.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository; import org.springframework.stereotype.Repository; import za.ac.cput.domain.Employee; @Repository public interface EmployeeRepository extends JpaRepository<Employee,String>{



    Optional<Employee> findByEmail(String email);
}