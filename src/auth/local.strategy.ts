import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const userFromDb = await this.authService.validateUser(email, password);

    if (!userFromDb) {
      throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
    }

    return userFromDb;
  }
}
