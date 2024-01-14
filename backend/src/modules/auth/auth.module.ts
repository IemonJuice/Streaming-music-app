import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {JwtStrategyService} from './services/jwt-strategy/jwt-strategy.service';
import {LocalStrategyService} from './services/local-strategy/local-strategy.service';
import {RegisterService} from './services/register/register.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../common/database/entities/user.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService, LocalStrategyService, RegisterService, JwtService],
  imports: [JwtModule.registerAsync({
    useFactory: () => ({
      secret: 'secret',
      signOptions: {
        expiresIn: '60m',
      },
    }),
  }),TypeOrmModule.forFeature([User])]
})
export class AuthModule {
}
