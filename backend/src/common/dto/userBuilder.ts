import {User} from "../database/entities/user.entity";

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

  setFirstName(firstName: string) {
    this.user.firstName = firstName;
    return this
  }


  setDateOfRegistration(dateOfRegistration: Date) {
    this.user.dateOfRegistration = dateOfRegistration
    return this
  }

  setEmail(email:string) {
    this.user.email = email
    return this
  }

  getUser(): User {
    return this.user;
  }
}
