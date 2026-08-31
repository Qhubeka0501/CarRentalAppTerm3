package za.ac.cput.service;

import org.springframework.stereotype.Service;
import za.ac.cput.domain.Notification;
import za.ac.cput.repository.NotificationRepository;

/*
 * Class Name: NotificationServiceImpl
 * Description: NotificationService CarRentSystem class
 * Author: Lucky July Twala (231242840)
 * Date: 12 July 2026
 */

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repository;

    public NotificationServiceImpl(NotificationRepository repository) {
        this.repository = repository;
    }

    @Override
    public Notification create(Notification notification) {
        return repository.save(notification);
    }

    @Override
    public Notification read(String notificationId) {
        return repository.findById(notificationId).orElse(null);
    }

    @Override
    public Notification update(Notification notification) {
        return repository.save(notification);
    }

    @Override
    public boolean delete(String notificationId) {
        if (repository.existsById(notificationId)) {
            repository.deleteById(notificationId);
            return true;
        }
        return false;
    }

    @Override public java.util.List<Notification> findAll(){ return repository.findAll(); }
}
