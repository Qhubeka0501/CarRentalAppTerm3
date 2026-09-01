package za.ac.cput.repository;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Employee;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/*
 * Class Name: EmployeeRepositoryTest
 * Description: EmployeeRepositoryTest CarRentalApp class
 * Author: Avuyile Twesha (240763394)
 */


@SpringBootTest
public class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @Test
    void savesAndReadsEmployee() {

        Employee employee = za.ac.cput.factory.EmployeeFactory.createEmployee(
                "John",
                "Smith",
                "john.repo@gmail.com",
                "0712345678",
                15000.0,
                "12345",
                null
        );

        assertNotNull(employee);

        repository.save(employee);

        String id = employee.getEmployeeId();

        Employee saved = repository.findById(id).orElse(null);

        assertNotNull(saved);
        assertEquals("John", saved.getFirstName());
        assertEquals("Smith", saved.getLastName());

        repository.deleteById(id);
    }
}








