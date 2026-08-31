package za.ac.cput.factory;

import util.Helper;
import za.ac.cput.domain.Customer;
import za.ac.cput.domain.HomeAddress;
import za.ac.cput.domain.NextOfKin;

import java.time.LocalDate;

public class CustomerFactory {

    public static Customer createCustomer(
            String firstName,
            String lastName,
            String email,
            String phoneNumber,
            String driverLicenseNumber,
            LocalDate dateOfBirth,
            HomeAddress address,
            NextOfKin nextOfKin) {

        if (Helper.isStringNull(firstName)
                || Helper.isStringNull(lastName)
                || Helper.isStringNull(email)
                || Helper.isStringNull(phoneNumber)
                || Helper.isStringNull(driverLicenseNumber)
                || dateOfBirth == null
                || address == null
                || nextOfKin == null) {
            return null;
        }

        if (!Helper.isEmailValid(email)) {
            return null;
        }

        if (!Helper.isPhoneValid(phoneNumber)) {
            return null;
        }

        return new Customer.Builder()
                .setFirstName(firstName)
                .setLastName(lastName)
                .setEmail(email)
                .setPhoneNumber(phoneNumber)
                .setDriverLicenseNumber(driverLicenseNumber)
                .setDateOfBirth(dateOfBirth)
                .setAddress(address)
                .setNextOfKin(nextOfKin)
                .build();
    }
}