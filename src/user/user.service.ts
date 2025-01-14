import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './DTOs/create-user.dto';
import { UserResponse } from './responses/user.response';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UpdateUserDTO } from './DTOs/update-user.dto';
import { TokenService } from '../token/token.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private tokenService: TokenService,
    private mailService: MailService,
  ) {}

  async createUser(user: CreateUserDTO): Promise<UserResponse> {
    const userFromDb = await this.findUserByEmail(user.email);

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

  async findUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id: number): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, newUser: UpdateUserDTO): Promise<UserResponse> {
    const userFromDb = await this.findUserById(id);

    if (!userFromDb) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        email: newUser.email ? newUser.email : userFromDb.email,
        password: userFromDb.password,
        name: newUser.name ? newUser.name : userFromDb.name,
        secondName: newUser.secondName
          ? newUser.secondName
          : userFromDb.secondName,
        phoneNumber: newUser.phoneNumber
          ? newUser.phoneNumber
          : userFromDb.phoneNumber,
        type: userFromDb.type,
      },
    });

    return new UserResponse(updatedUser);
  }

  async updatePasswordRequest(email: string): Promise<void> {
    const user: User = await this.findUserByEmail(email);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const userPasswordUpdateToken =
      await this.tokenService.generateUserPasswordUpdateToken(user);

    await this.mailService.sendMail(
      user.email,
      'Otogryzonie',
      'Password reset',
      `Hello ${user.name}, click the following link to update your password: http://testLink/${userPasswordUpdateToken.userPasswordUpdateToken}`,
    );
  }

  async updatePasssoword(
    passwordUpdateToken: string,
    newPassword: string,
  ): Promise<string> {
    const payload =
      await this.tokenService.verifyUserPasswordUpdateToken(
        passwordUpdateToken,
      );

    const user = await this.findUserById(payload.sub);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    const newHashedPassword = await this.hashPassword(newPassword);

    await this.prismaService.user.update({
      where: { id: payload.sub },
      data: {
        password: newHashedPassword,
      },
    });

    return 'Password updated succesfully';
  }
}
