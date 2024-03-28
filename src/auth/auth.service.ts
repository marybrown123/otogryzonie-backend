import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const userFromDb = await this.userService.findUserByEmail(email);

    if (!userFromDb) {
      throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
    }

    const passwordValid = await bcrypt.compare(password, userFromDb.password);

    if (!passwordValid) {
      throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
    }

    return userFromDb;
  }
}
