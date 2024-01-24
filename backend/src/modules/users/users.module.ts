import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../common/database/entities/user.entity";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports:[TypeOrmModule.forFeature([User])]
})
export class UsersModule {}
