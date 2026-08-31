package za.ac.cput.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String loginId;
    private String email;
    private LocalDateTime loginTime;

    protected Login() {
    }

    private Login(Builder builder) {
        this.loginId = builder.loginId;
        this.email = builder.email;
        this.loginTime = builder.loginTime;
    }

    public String getLoginId() {
        return loginId;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getLoginTime() {
        return loginTime;
    }

    public static class Builder {
        private String loginId;
        private String email;
        private LocalDateTime loginTime;

        public Builder setLoginId(String loginId) {
            this.loginId = loginId;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setLoginTime(LocalDateTime loginTime) {
            this.loginTime = loginTime;
            return this;
        }

        public Builder copy(Login login) {
            this.loginId = login.loginId;
            this.email = login.email;
            this.loginTime = login.loginTime;
            return this;
        }

        public Login build() {
            return new Login(this);
        }
    }
}
