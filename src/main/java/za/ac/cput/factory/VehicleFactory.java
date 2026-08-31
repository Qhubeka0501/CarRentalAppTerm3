package za.ac.cput.factory;

import util.Helper;
import za.ac.cput.domain.Vehicle;
import za.ac.cput.domain.VehicleStatus;

public class VehicleFactory {

    public static Vehicle createVehicle(
            String licensePlate,
            String make,
            String model,
            int year,
            String color,
            double mileage,
            double dailyRate,
            double weeklyRate,
            VehicleStatus status) {

        if (Helper.isStringNull(licensePlate)
                || Helper.isStringNull(make)
                || Helper.isStringNull(model)
                || Helper.isStringNull(color)
                || status == null) {
            return null;
        }

        if (year <= 0
                || mileage < 0
                || dailyRate <= 0
                || weeklyRate <= 0) {
            return null;
        }

        return new Vehicle.Builder()
                .setLicensePlate(licensePlate)
                .setMake(make)
                .setModel(model)
                .setYear(year)
                .setColor(color)
                .setMileage(mileage)
                .setDailyRate(dailyRate)
                .setWeeklyRate(weeklyRate)
                .setStatus(status)
                .build();
    }
}