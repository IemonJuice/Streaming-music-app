import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../../common/database/entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async deleteUserById(id: number) {
    console.log(id)
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    })
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.userRepository.remove(user);
  }
}
