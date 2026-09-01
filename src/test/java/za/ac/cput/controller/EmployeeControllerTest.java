package za.ac.cput.controller;


/*
 * Class Name: EmployeeControllerTest
 * Description: EmployeeControllerTest CarRentalApp class
 * Author: Avuyile Twesha (240763394)
 */


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Employee;
import za.ac.cput.factory.EmployeeFactory;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmployeeControllerTest {

    @Autowired
    private EmployeeController controller;

    @Test
    void createReadDelete() {

        Employee employee = EmployeeFactory.createEmployee(
                "John",
                "Smith",
                "john.controller@gmail.com",
                "0712345678",
                15000.0,
                "12345",
                null
        );

        assertNotNull(employee);

        Employee created = controller.create(employee);

        assertNotNull(created);

        String id = created.getEmployeeId();

        Employee read = controller.read(id);

        assertNotNull(read);
        assertEquals("John", read.getFirstName());

        assertTrue(controller.delete(id));

        assertNull(controller.read(id));
    }
}






