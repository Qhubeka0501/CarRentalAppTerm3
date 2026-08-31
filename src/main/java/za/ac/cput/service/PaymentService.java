package za.ac.cput.service;

import za.ac.cput.domain.Payment;
/*  Class Name: PaymentService

     Description: PaymentService CarRentSystem class

     Author: Lucky July Twala (231242840)

     Date: 12 July 2026 */
public interface PaymentService extends IService<Payment,String> {
    java.util.List<Payment> findAll();

}
