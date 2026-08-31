package za.ac.cput.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Register {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String registerId;
    private String email;
    private LocalDateTime registeredAt;

    protected Register() {
    }

    private Register(Builder builder) {
        this.registerId = builder.registerId;
        this.email = builder.email;
        this.registeredAt = builder.registeredAt;
    }

    public String getRegisterId() {
        return registerId;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public static class Builder {
        private String registerId;
        private String email;
        private LocalDateTime registeredAt;

        public Builder setRegisterId(String registerId) {
            this.registerId = registerId;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setRegisteredAt(LocalDateTime registeredAt) {
            this.registeredAt = registeredAt;
            return this;
        }

        public Builder copy(Register register) {
            this.registerId = register.registerId;
            this.email = register.email;
            this.registeredAt = register.registeredAt;
            return this;
        }

        public Register build() {
            return new Register(this);
        }
    }
}
