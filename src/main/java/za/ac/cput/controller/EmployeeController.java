package za.ac.cput.controller;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Employee;
import za.ac.cput.service.EmployeeService;
import java.util.List;

/*
 * Class Name: EmployeeController
 * Description: EmployeeController CarRentalApp class
 * Author: Avuyile Twesha (240763394)
 */



@RestController
@RequestMapping("/employee")
public class EmployeeController{private final EmployeeService service;
    public EmployeeController(EmployeeService service){
        this.service=service;
    }
    @PostMapping("/create")
    public Employee create(@RequestBody Employee x){return service.create(x);} @GetMapping("/read/{id}")
    public Employee read(@PathVariable String id){
        return service.read(id);
    }
    @PutMapping("/update")
    public Employee update(@RequestBody Employee x){
        return service.update(x);
    }
    @DeleteMapping("/delete/{id}") public boolean delete(@PathVariable String id){
        return service.delete(id);
    } @GetMapping("/getAll") public List<Employee> getAll(){
        return service.findAll();
    }

}