package za.ac.cput.factory;

import za.ac.cput.domain.Login;

import java.time.LocalDateTime;

public class LoginFactory {
    public static Login createLogin(String email) {
        return new Login.Builder()
                .setEmail(email)
                .setLoginTime(LocalDateTime.now())
                .build();
    }
}
