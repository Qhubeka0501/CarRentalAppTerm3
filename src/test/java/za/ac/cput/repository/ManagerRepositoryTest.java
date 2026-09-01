package za.ac.cput.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Manager;
import za.ac.cput.factory.ManagerFactory;


/*
 * Class Name: ManagerRepositoryTest
 * Description: ManagerRepositoryTest CarRentalApp class
 * Author: Avuyile Twesha (240763394)
 */

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest

public class ManagerRepositoryTest {
    @Autowired
    private ManagerRepository repository;
    @Test
    void savesAndReadsManager() {

        Manager manager = ManagerFactory.createManager(
                "John",
                "Smith",
                "john.manager.repo@gmail.com",
                "0712345678",
                20000.0,
                "12345",
                "M001",
                null
        );

        assertNotNull(manager);

        repository.save(manager);

        String id = manager.getManagerId();

        Manager saved = repository.findById(id).orElse(null);

        assertNotNull(saved);
        assertEquals("John", saved.getFirstName());
        assertEquals("Smith", saved.getLastName());
        assertEquals("M001", saved.getManagerCode());

        repository.deleteById(id);
    }

}
