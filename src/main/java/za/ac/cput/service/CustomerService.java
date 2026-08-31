package za.ac.cput.service;

import za.ac.cput.domain.Customer;

import java.util.List;

/*
 * Class Name: CustomerService
 * Description: CustomerService interface for CarRentSystem
 * Author: Qhubekani Shandu (231316267)
 * Date: 04 August 2026
 */
public interface CustomerService extends IService<Customer, String> {

    List<Customer> findAll();

}
