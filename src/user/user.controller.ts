import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/DTOs/create-user.dto';
import { UserResponse } from 'src/user/responses/user.response';
import { UserService } from 'src/user/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDTO): Promise<UserResponse> {
    return this.userService.createUser(user);
  }
}
