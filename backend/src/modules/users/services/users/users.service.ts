import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../../common/database/entities/user.entity";
import {Repository} from "typeorm";
import {UserDto} from "../../../../common/dto/User.dto";

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

  async updateUser(user: UserDto) {

    const existedUser = await this.userRepository.findOne({
      where:{
        id:user.id
      }
    })

    if(!existedUser){
      throw  new UnauthorizedException()
    }
    return await this.userRepository.save({
      ...existedUser,
      ...user
    })
  }
}
