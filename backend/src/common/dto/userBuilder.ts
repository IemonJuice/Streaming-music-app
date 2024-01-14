import {User} from "../database/entities/user.entity";
import {hash} from "bcrypt";

export class UserBuilder {
  private readonly user: User

  constructor() {
    this.user = new User();
  }

  setPassword(password: string) {
    this.user.password = password;
    return this
  }

  setUsername(username: string) {
    this.user.username = username;
    return this
  }

  setFirstName(firstname: string) {
    this.user.firstname = firstname;
    return this
  }

  setDateOfBirth(dateOfBirth: Date) {
    this.user.dateOfBirth = dateOfBirth;
    return this
  }

  setDateOfRegistration(dateOfRegistration: Date) {
    this.user.dateOfRegistration = dateOfRegistration
    return this
  }

  setGender(gender:string) {
    this.user.gender = gender
    return this
  }

  setEmail(email:string) {
    this.user.email = email
    return this
  }

  setTel(tel:string) {
    this.user.tel = tel
    return this
  }

  setLastName(lastName:string) {
    this.user.lastname = lastName;
    return this;
  }

  getUser(): User {
    return this.user;
  }
}
