package za.ac.cput.factory;

import za.ac.cput.domain.Register;

import java.time.LocalDateTime;

public class RegisterFactory {
    public static Register createRegister(String email) {
        return new Register.Builder()
                .setEmail(email)
                .setRegisteredAt(LocalDateTime.now())
                .build();
    }
}
