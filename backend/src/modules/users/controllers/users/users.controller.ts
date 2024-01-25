import {Body, Controller, Delete, Param, Patch} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {UserDto} from "../../../../common/dto/User.dto";


@Controller('users')
export class UsersController {
  constructor(private usersService:UsersService) {}
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUserById(id)
  }
  @Patch()
  async updateUser(@Body() user:UserDto) {
    return await this.usersService.updateUser(user)
  }
}
