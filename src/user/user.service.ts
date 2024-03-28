import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from 'src/user/DTOs/create-user.dto';
import { UserResponse } from 'src/user/responses/user.response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: CreateUserDTO): Promise<UserResponse> {
    const userFromDb = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userFromDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashPassword(user.password);

    const userFroDb = await this.prismaService.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
        secondName: user.secondName,
        phoneNumber: user.phoneNumber,
        type: user.type,
      },
    });

    return new UserResponse(userFroDb);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
