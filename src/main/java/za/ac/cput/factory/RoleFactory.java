package za.ac.cput.factory;

import util.Helper;
import za.ac.cput.domain.Role;

public class RoleFactory {
    public static Role createRole(String name) {
        if (Helper.isStringNull(name)) {
            return null;
        }

        return new Role.Builder()
                .setName(name.trim())
                .build();
    }
}
