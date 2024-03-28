import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { AuthenticatedUserPayload } from 'src/token/interfaces/authenticated-user-payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECREET,
    });
  }

  async validate(payload: AuthenticatedUserPayload): Promise<User> {
    const currentUser = await this.userService.findUserById(payload.sub);

    if (currentUser) {
      return currentUser;
    }
  }
}
