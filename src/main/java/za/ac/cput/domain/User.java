package za.ac.cput.domain;
import jakarta.persistence.*;
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
 @Id @GeneratedValue(strategy=GenerationType.UUID) private String userId;
 private String firstName; private String lastName; @Column(unique=true) private String email; private String phoneNumber;
 @ManyToOne @JoinColumn(name="role_id") private Role role;
 protected User(){}
 protected User(Builder<?> b){userId=b.userId;firstName=b.firstName;lastName=b.lastName;email=b.email;phoneNumber=b.phoneNumber;role=b.role;}
 public String getUserId(){return userId;} public String getFirstName(){return firstName;} public String getLastName(){return lastName;} public String getEmail(){return email;} public String getPhoneNumber(){return phoneNumber;} public Role getRole(){return role;}
 public static class Builder<T extends Builder<T>>{private String userId,firstName,lastName,email,phoneNumber; private Role role; protected T self(){return (T)this;} public T setUserId(String v){userId=v;return self();} public T setFirstName(String v){firstName=v;return self();} public T setLastName(String v){lastName=v;return self();} public T setEmail(String v){email=v;return self();} public T setPhoneNumber(String v){phoneNumber=v;return self();} public T setRole(Role v){role=v;return self();}
 public T copy(User user){userId=user.userId;firstName=user.firstName;lastName=user.lastName;email=user.email;phoneNumber=user.phoneNumber;role=user.role;return self();}
 public User build(){return new User(this);} }
}