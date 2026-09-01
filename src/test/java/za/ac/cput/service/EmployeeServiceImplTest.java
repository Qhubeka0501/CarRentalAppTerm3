package za.ac.cput.service;
/*
 * Class Name: EmployeeServiceImplTest
 * Description: EmployeeServiceImplTest CarRentalApp class
 * Author: Avuyile Twesha (240763394)
 */

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Employee;
import za.ac.cput.repository.EmployeeRepository;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmployeeServiceImplTest {
    @Autowired EmployeeService service;

    @Test
    void crud() {

        Employee x = za.ac.cput.factory.EmployeeFactory.createEmployee(
                "John",
                "Smith",
                "john@gmail.com",
                "0712345678",
                15000.0,
                "12345",
                null
        );

        Employee saved = service.create(x);

        assertNotNull(saved);

        String id = saved.getEmployeeId();

        assertNotNull(service.read(id));

        assertTrue(service.delete(id));

        assertNull(service.read(id));
    }


    }