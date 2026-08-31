package za.ac.cput.service;

import org.springframework.stereotype.Service;
import za.ac.cput.domain.Customer;
import za.ac.cput.repository.CustomerRepository;

import java.util.List;

/*
 * Class Name: CustomerServiceImpl
 * Description: CustomerService implementation for CarRentSystem
 * Author: Qhubekani Shandu (231316267)
 * Date: 04 August 2026
 */
@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository repository;

    public CustomerServiceImpl(CustomerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Customer create(Customer customer) {
        return repository.save(customer);
    }

    @Override
    public Customer read(String customerId) {
        return repository.findById(customerId).orElse(null);
    }

    @Override
    public Customer update(Customer customer) {
        return repository.save(customer);
    }

    @Override
    public boolean delete(String customerId) {
        if (repository.existsById(customerId)) {
            repository.deleteById(customerId);
            return true;
        }
        return false;
    }

    @Override
    public List<Customer> findAll() {
        return repository.findAll();
    }
}