import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy} from "passport-local";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../../../../common/database/entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class  LocalStrategyService extends PassportStrategy(Strategy) {
  private readonly logger:Logger = new Logger(PassportStrategy.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,) {
    super();
  }

  public async validate(
    username: string,
    password: string,
  ): Promise<User> {
    const user: User = await this.userRepository.findOneBy({
      username: username,
    });
    if (!user) {
      this.logger.debug(` user not found: ${username}`);
      throw new BadRequestException(` user not found: ${username}`);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(
        `password mismatch with  ${user.username} and ${user.password}  ${password}`,
      );
      throw new BadRequestException(`Invalid password`);
    }
    return user;
  }
}
