package za.ac.cput.service;

import org.springframework.stereotype.Service;
import za.ac.cput.domain.Employee;
import za.ac.cput.domain.Login;
import za.ac.cput.repository.EmployeeRepository;
import za.ac.cput.repository.LoginRepository;

import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {

    private final LoginRepository repository;
    private final EmployeeRepository employeeRepository;

    public LoginServiceImpl(LoginRepository repository,
                            EmployeeRepository employeeRepository) {
        this.repository = repository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Login create(Login x) {
        return repository.save(x);
    }

    @Override
    public Login read(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Login update(Login x) {
        return repository.save(x);
    }

    @Override
    public boolean delete(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Login> findAll() {
        return repository.findAll();
    }

    @Override
    public Employee authenticate(String email, String password) {

        return employeeRepository.findByEmail(email)
                .filter(employee ->
                        employee.getPassword() != null &&
                                employee.getPassword().equals(password))
                .orElse(null);
    }
}