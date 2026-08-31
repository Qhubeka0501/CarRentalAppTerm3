package za.ac.cput.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String roleId;

    @Column(unique = true, nullable = false)
    private String name;

    protected Role() {
    }

    private Role(Builder builder) {
        this.roleId = builder.roleId;
        this.name = builder.name;
    }

    public String getRoleId() {
        return roleId;
    }

    public String getName() {
        return name;
    }

    public static class Builder {
        private String roleId;
        private String name;

        public Builder setRoleId(String roleId) {
            this.roleId = roleId;
            return this;
        }

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder copy(Role role) {
            this.roleId = role.roleId;
            this.name = role.name;
            return this;
        }

        public Role build() {
            return new Role(this);
        }
    }
}
