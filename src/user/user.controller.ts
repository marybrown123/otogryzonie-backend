import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/DTOs/create-user.dto';
import { UpdatePasswordDTO } from 'src/user/DTOs/update-passoword.dto';
import { UpdateUserDTO } from 'src/user/DTOs/update-user.dto';
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

  @Patch('/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiCreatedResponse({ type: UserResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateUser(
    @Param('id') id: string,
    @Body() newUser: UpdateUserDTO,
  ): Promise<UserResponse> {
    return this.userService.updateUser(Number(id), newUser);
  }

  @Post('/:email')
  @ApiOperation({ summary: 'Update user password request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiCreatedResponse({ type: 'void' })
  async updatePasswordRequest(@Param('email') email: string): Promise<void> {
    await this.userService.updatePasswordRequest(email);
  }

  @Patch()
  @ApiOperation({ summary: 'Update user password' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCreatedResponse({ type: 'string' })
  async updatePassword(
    @Body() updatePassword: UpdatePasswordDTO,
  ): Promise<string> {
    return this.userService.updatePasssoword(
      updatePassword.token,
      updatePassword.newPassword,
    );
  }
}
