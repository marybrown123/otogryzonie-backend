import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthenticationTokenDTO } from 'src/token/DTOs/authentication-token.dto';
import { AuthenticatedUserPayload } from 'src/token/interfaces/authenticated-user-payload.interface';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateAuthenticationToken(
    user: User,
  ): Promise<AuthenticationTokenDTO> {
    const payload: AuthenticatedUserPayload = {
      email: user.email,
      sub: user.id,
    };

    const authenticationToken = this.jwtService.sign(payload);

    return { authenticationToken };
  }
}
