package za.ac.cput.domain;
import jakarta.persistence.*;

/*  Class Name: Manager

     Description: Manager CarRentalApp class

     Author: Avuyile Twesha (240763394)

      */


@Entity

public class Manager extends Employee {
    private String managerCode;
    protected Manager(){}
    private Manager(Builder b){super(b);managerCode=b.managerCode;}

    public String getManagerId(){

        return getUserId();
    }
    public String getManagerCode(){

        return managerCode;
    }
    public void approveBooking(){}
    public static class Builder extends Employee.Builder<Builder>{
        private String managerCode;
        public Builder setManagerId(String v){
            return setUserId(v);}
        public Builder setManagerCode(String v){managerCode=v;return this;}
        public Builder copy(Manager m){super.copy(m);managerCode=m.managerCode;return this;} @Override
        public Manager build(){
            return new Manager(this);}
    }
}