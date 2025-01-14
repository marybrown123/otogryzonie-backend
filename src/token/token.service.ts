import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthenticationTokenDTO } from 'src/token/DTOs/authentication-token.dto';
import { UserPasswordUpdateTokenDTO } from 'src/token/DTOs/password-reset-token.dto';
import { UserPayload } from 'src/token/interfaces/authenticated-user-payload.interface';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateAuthenticationToken(
    user: User,
  ): Promise<AuthenticationTokenDTO> {
    const payload: UserPayload = {
      email: user.email,
      sub: user.id,
    };

    const authenticationToken = this.jwtService.sign(payload);

    return { authenticationToken };
  }

  async generateUserPasswordUpdateToken(
    user: User,
  ): Promise<UserPasswordUpdateTokenDTO> {
    const payload: UserPayload = {
      email: user.email,
      sub: user.id,
    };

    const userPasswordUpdateToken = this.jwtService.sign(payload);

    return { userPasswordUpdateToken };
  }

  async verifyUserPasswordUpdateToken(
    userPassswordUpdateToken: string,
  ): Promise<UserPayload> {
    try {
      return this.jwtService.verify(userPassswordUpdateToken);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
