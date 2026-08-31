package za.ac.cput.factory;

import util.Helper;
import za.ac.cput.domain.HomeAddress;

public class HomeAddressFactory {

    public static HomeAddress createHomeAddress(
            String streetNumber,
            String houseNumber,
            String city,
            String province,
            String postalCode,
            String country) {

        if (Helper.isStringNull(streetNumber)
                || Helper.isStringNull(houseNumber)
                || Helper.isStringNull(city)
                || Helper.isStringNull(province)
                || Helper.isStringNull(postalCode)
                || Helper.isStringNull(country)) {
            return null;
        }

        if (!Helper.isStreetAddressValid(streetNumber)) {
            return null;
        }

        return new HomeAddress.Builder()
                .setStreetNumber(streetNumber)
                .setHouseNumber(houseNumber)
                .setCity(city)
                .setProvince(province)
                .setPostalCode(postalCode)
                .setCountry(country)
                .build();
    }
}