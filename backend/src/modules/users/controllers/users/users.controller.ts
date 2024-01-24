import {Controller, Delete, Param} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService:UsersService) {}
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUserById(id)
  }
}
