import {Body, ClassSerializerInterceptor, Controller, Get, Post,  Request, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthService} from "../services/auth.service";
import {RegisterService} from "../services/register/register.service";
import {UserToRegisterDto} from "../../../common/dto/UserToRegisterDto";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private registerService: RegisterService) {
  }

  @Post('register')
  register(@Body() userToRegister:UserToRegisterDto) {
    return this.registerService.registerUser(userToRegister)
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('local'))
  async login(@Request() request) {
    return {
      userId: request.user.id,
      token: this.authService.getTokenForUser(request.user),
    };
  }

  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  async getAccount(@Request() request): Promise<unknown> {
    return request.user;
  }

}
