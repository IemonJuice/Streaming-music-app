import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import {User} from "../../../common/database/entities/user.entity";
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getTokenForUser(user: User) {
    return this.jwtService.sign({
      username: user,
      sub: user.id,
    },
      {
      expiresIn: '60m',
      secret: 'secret'
    });
  }

  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
