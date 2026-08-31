package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Payment;

/*
 * Class Name: PaymentRepository
 * Description: PaymentRepository CarRentSystem class
 * Author: Lucky July Twala (231242840)
 * Date: 12 July 2026
 */

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

}