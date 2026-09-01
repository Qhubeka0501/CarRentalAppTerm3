package za.ac.cput.controller;


/*
 * Class Name: ManagerControllerTest
 * Description: ManagerControllerTest CarRentalApp class
 * Author: Avuyile Twesha (240763394)
 */


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Manager;
import za.ac.cput.factory.ManagerFactory;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest

    public class ManagerControllerTest {

        @Autowired
        private ManagerController controller;
        @Test
        void createReadDelete() {

            Manager manager = ManagerFactory.createManager(
                    "John",
                    "Smith",
                    "john.manager.controller@gmail.com",
                    "0712345678",
                    20000.0,
                    "12345",
                    "M001",
                    null
            );


            assertNotNull(manager);

            Manager created = controller.create(manager);

            assertNotNull(created);

            String id = created.getManagerId();

            Manager read = controller.read(id);

            assertNotNull(read);
            assertEquals("John", read.getFirstName());
            assertEquals("M001", read.getManagerCode());

            assertTrue(controller.delete(id));

            assertNull(controller.read(id));
        }


        }
