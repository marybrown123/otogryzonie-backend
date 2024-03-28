import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthenticationTokenDTO } from 'src/token/DTOs/authentication-token.dto';
import { TokenService } from 'src/token/token.service';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly tokenServcie: TokenService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@CurrentUser() user: User): Promise<AuthenticationTokenDTO> {
    return this.tokenServcie.generateAuthenticationToken(user);
  }
}
