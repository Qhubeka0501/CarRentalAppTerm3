 package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Notification;

/*
 * Class Name: NotificationRepository
 * Description: NotificationRepository CarRentSystem class
 * Author: Lucky July Twala (231242840)
 * Date: 12 July 2026
 */

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {

}