package za.ac.cput.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Manager;

/*
 * Class Name: ManagerRepository
 * Description: ManagerRepository CarRentalApp class
 * Author: Avuyile Twesha ( 240763394)
*/


@Repository
public interface ManagerRepository extends JpaRepository<Manager,String>{}