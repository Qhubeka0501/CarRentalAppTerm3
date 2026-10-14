package za.ac.cput.controller;

import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Employee;
import za.ac.cput.domain.Login;
import za.ac.cput.service.LoginService;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final LoginService service;

    public LoginController(LoginService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public Login create(@RequestBody Login x) {
        return service.create(x);
    }

    @GetMapping("/read/{id}")
    public Login read(@PathVariable String id) {
        return service.read(id);
    }

    @PutMapping("/update")
    public Login update(@RequestBody Login x) {
        return service.update(x);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable String id) {
        return service.delete(id);
    }

    @GetMapping("/getAll")
    public List<Login> getAll() {
        return service.findAll();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticate(
            @RequestBody Map<String, String> credentials,
            HttpSession session)  {

        String email = credentials.get("email");
        String password = credentials.get("password");

        Employee employee = service.authenticate(email, password);

        if (employee == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Invalid email or password");

            return ResponseEntity.status(401).body(response);
        }

        session.setAttribute("loggedInUser", employee.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("email", employee.getEmail());

        return ResponseEntity.ok(response);
    }




    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status(HttpSession session) {

        Object loggedInUser = session.getAttribute("loggedInUser");

        Map<String, Object> response = new HashMap<>();

        if (loggedInUser == null) {
            response.put("loggedIn", false);
            return ResponseEntity.status(401).body(response);
        }

        response.put("loggedIn", true);
        response.put("email", loggedInUser);

        return ResponseEntity.ok(response);
    }



    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {

        session.invalidate();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logout successful");

        return ResponseEntity.ok(response);
    }
}