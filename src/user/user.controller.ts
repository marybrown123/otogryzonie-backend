import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/DTOs/create-user.dto';
import { UserResponse } from 'src/user/responses/user.response';
import { UserService } from 'src/user/user.service';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Sign up - Create new user' })
  @ApiCreatedResponse({ type: UserResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createUser(@Body() user: CreateUserDTO): Promise<UserResponse> {
    return this.userService.createUser(user);
  }
}
