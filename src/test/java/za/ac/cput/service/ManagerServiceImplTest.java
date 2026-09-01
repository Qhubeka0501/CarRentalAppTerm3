package za.ac.cput.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Manager;

import static org.junit.jupiter.api.Assertions.*;

/*
 * Class Name: ManagerServiceImplTest
 * Description: ManagerServiceImplTest CarRentalApp class
 * Author: Avuyile Twesha (240763394)
 */

@SpringBootTest
public class ManagerServiceImplTest {

    @Autowired
    ManagerService service;

    @Test
    void crud() {

        Manager x = za.ac.cput.factory.ManagerFactory.createManager(
                "John",
                "Smith",
                "john.manager@gmail.com",
                "0712345678",
                20000.0,
                "12345",
                "M001",
                null
        );
        assertNotNull(x);

        Manager saved = service.create(x);

        assertNotNull(saved);

        String id = saved.getManagerId();

        assertNotNull(service.read(id));

        assertTrue(service.delete(id));

        assertNull(service.read(id));
    }

}
