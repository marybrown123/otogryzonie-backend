import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserLoginDTO } from 'src/auth/DTOs/user-login.dto';
import { AuthenticationTokenDTO } from 'src/token/DTOs/authentication-token.dto';
import { TokenService } from 'src/token/token.service';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly tokenServcie: TokenService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Log in' })
  @ApiBody({ type: UserLoginDTO })
  @ApiOkResponse({ type: AuthenticationTokenDTO })
  @ApiUnauthorizedResponse({ description: 'Wrong credentials' })
  @Post()
  async login(@CurrentUser() user: User): Promise<AuthenticationTokenDTO> {
    return this.tokenServcie.generateAuthenticationToken(user);
  }
}
