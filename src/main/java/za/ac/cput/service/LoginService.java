package za.ac.cput.service;

import za.ac.cput.domain.Employee;
import za.ac.cput.domain.Login;

import java.util.List;

public interface LoginService extends IService<Login, String> {

    List<Login> findAll();

    Employee authenticate(String email, String password);
}