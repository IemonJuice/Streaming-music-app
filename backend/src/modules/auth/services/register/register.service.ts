import {BadRequestException, Injectable} from '@nestjs/common';
import {UserToRegisterDto} from "../../../../common/dto/UserToRegisterDto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../../common/database/entities/user.entity";
import {Repository} from "typeorm";
import {AuthService} from "../auth.service";
import {hash} from "bcrypt";
import {UserBuilder} from "../../../../common/dto/userBuilder";

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {
  }

  async registerUser(
    userToRegister: UserToRegisterDto,
  ): Promise<any> {
    const existedUser: User = await this.userRepository.findOneBy({
      username: userToRegister.username,
    });

    if (existedUser) {
      throw new BadRequestException('user already exists');
    }

    const hashedPassword = await hash(userToRegister.password, 10);
    const newUser: User = new UserBuilder()
      .setDateOfRegistration(userToRegister.dateOfRegistration)
      .setEmail(userToRegister.email)
      .setFirstName(userToRegister.firstName)
      .setPassword(hashedPassword)
      .setUsername(userToRegister.username)
      .getUser()

    return {
      user: await this.userRepository.save(newUser),
      token: this.authService.getTokenForUser(newUser),
    };
  }
}
