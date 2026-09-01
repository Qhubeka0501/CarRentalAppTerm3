package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Employee;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/*
 * Class Name: EmployeeFactoryTest
 * Description: EmployeeFactoryTest CarRentalApp class
 * Author: Avuyile Twesha (240763394)
 */


public class EmployeeFactoryTest {
    @Test
    void createEmployee() {

        Employee employee = EmployeeFactory.createEmployee(
                "John",
                "Smith",
                "john@gmail.com",
                "0712345678",
                15000.0,
                "12345",
                null
        );

        assertNotNull(employee);
        assertEquals("John", employee.getFirstName());
        assertEquals("Smith", employee.getLastName());
        assertEquals("john@gmail.com", employee.getEmail());
        assertEquals("0712345678", employee.getPhoneNumber());
        assertEquals(15000.0, employee.getSalary());
        assertEquals("12345", employee.getPassword());
    }

}
