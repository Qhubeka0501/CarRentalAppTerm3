package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Manager;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


/*
 * Class Name: ManagerFactoryTest
 * Description: ManagerFactoryTest CarRentalApp class
 * Author: Avuyile Twesha (240763394)
 */


public class ManagerFactoryTest {

    @Test
    void createManager() {

        Manager manager = ManagerFactory.createManager(
                "John",
                "Smith",
                "john.manager.factory@gmail.com",
                "0712345678",
                20000.0,
                "12345",
                "M001",
                null
        );
        assertNotNull(manager);
        assertEquals("John", manager.getFirstName());
        assertEquals("Smith", manager.getLastName());
        assertEquals("john.manager.factory@gmail.com", manager.getEmail());
        assertEquals("0712345678", manager.getPhoneNumber());
        assertEquals(20000.0, manager.getSalary());
        assertEquals("12345", manager.getPassword());
        assertEquals("M001", manager.getManagerCode());


    }

    }
