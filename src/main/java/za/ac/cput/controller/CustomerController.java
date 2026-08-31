package za.ac.cput.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Customer;
import za.ac.cput.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final  CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Creates a new customer using the customer service layer.
    @PostMapping("/create")
    public Customer create(@RequestBody Customer customer) {
        return customerService.create(customer);
    }

    // Retrieves a customer using the customer's ID.
    @GetMapping("/read/{customerId}")
    public Customer read(@PathVariable("customerId") String customerId) {
        return customerService.read(customerId);
    }

    // Updates an existing customer's details using the customer service layer.
    @PutMapping("/update")
    public Customer update(@RequestBody Customer customer) {
        return customerService.update(customer);
    }

    // Deletes a customer using the customer's ID.
    @DeleteMapping("/delete/{customerId}")
    public void delete(@PathVariable("customerId") String customerId) {
        customerService.delete(customerId);
    }

    // Retrieves the full list of customers currently stored in the system.
    @GetMapping("/getAll")
    public List<Customer> getAll() {
        return customerService.findAll();
    }
}