package za.ac.cput.factory;
import util.Helper;
import za.ac.cput.domain.Manager;
import za.ac.cput.domain.Role;

/*
 * Class Name: ManagerFactory
 * Description: Factory class for creating Manager objects
 * Author: Avuyile Twesha (240763394)
 */

public class ManagerFactory{public static Manager createManager(String firstName,String lastName,String email,String phone,double salary,String password,String managerCode,Role role){
    if(Helper.isStringNull(managerCode)
            ||!Helper.isEmailValid(email)
            ||Helper.isStringNull(password))
        return null;
    return new Manager.Builder()
            .setFirstName(firstName)
            .setLastName(lastName)
            .setEmail(email)
            .setPhoneNumber(phone)
            .setSalary(salary)
            .setPassword(password)
            .setManagerCode(managerCode)
            .setRole(role)
            .build();
}

}