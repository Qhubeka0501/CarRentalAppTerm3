package za.ac.cput.domain;
import jakarta.persistence.*;

/*  Class Name: Employee
 *Description: Employee CarRentalApp class
 *Author: Avuyile Twesha (240763394)
  */

@Entity

public class Employee extends User {
 private double salary;
 private String password;
 protected Employee(){}
 protected Employee(Builder<?> b){super(b);salary=b.salary;password=b.password;}

 public String getEmployeeId(){
  return getUserId();
 }

 public double getSalary(){
  return salary;
 }
 public String getPassword(){
  return password;
 }
 public static class Builder<T extends Builder<T>> extends User.Builder<T>{
  private double salary;
  private String password;

  public T setEmployeeId(String v){
   return setUserId(v);
  }
  public T setSalary(double v){
   salary=v;
   return self();
  }
  public T setPassword(String v){
   password=v;
   return self();
  }
 public T copy(Employee employee){super.copy(employee);salary=employee.salary;password=employee.password;return self();}
 public Employee build(){
   return new Employee(this);}
 }
}



