import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDTO } from '../../DTOs/create-user.dto';
import { UserService } from '../../user.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserDTO } from '../../DTOs/update-user.dto';
import { TokenService } from '../../../token/token.service';
import { MailService } from '../../../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserPasswordUpdateTokenDTO } from 'src/token/DTOs/password-reset-token.dto';
import { UserPayload } from 'src/token/interfaces/authenticated-user-payload.interface';
import { UpdatePasswordDTO } from 'src/user/DTOs/update-passoword.dto';

const testUserCorrect: CreateUserDTO = {
  email: 'test@mail.com',
  name: 'testName',
  secondName: 'testSecondName',
  password: 'testPassword',
  phoneNumber: '+48123456789',
  type: 'BREEDER',
};

const testUpdateUser: UpdateUserDTO = {
  name: 'testNameUpdated',
  secondName: 'testSecondNameUpdated',
};

describe('UserService', () => {
  let prismaService: PrismaService;
  let userService: UserService;
  let tokenService: TokenService;
  let mailService: MailService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        UserService,
        TokenService,
        MailService,
        JwtService,
      ],
      imports: [
        MailerModule.forRoot({
          transport: {
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT, 10),
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          },
        }),
      ],
    }).compile();

    await module.createNestApplication().init();
    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    tokenService = module.get<TokenService>(TokenService);
    mailService = module.get<MailService>(MailService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should create new user', async () => {
    const prismaUserCreateMockResult: User = {
      id: 1,
      email: 'test@mail.com',
      name: 'testName',
      secondName: 'testSecondName',
      password: 'testPassword',
      phoneNumber: '+48123456789',
      type: 'BREEDER',
    };

    const prismaUserCreateMock = jest
      .spyOn(prismaService.user, 'create')
      .mockResolvedValue(prismaUserCreateMockResult);

    const userServiceFindUserByEmailMockResult: User | null = null;

    const prismaUserFindUniqueMock = jest
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValue(userServiceFindUserByEmailMockResult);

    const userServiceHashPasswordMockResult = 'testPasswordMock';

    const userServiceHashPasswordMock = jest
      .spyOn(userService, 'hashPassword')
      .mockResolvedValue(userServiceHashPasswordMockResult);

    const testResult = await userService.createUser(testUserCorrect);

    expect(prismaUserCreateMock).toHaveBeenCalledTimes(1);
    expect(prismaUserFindUniqueMock).toHaveBeenCalledTimes(1);
    expect(userServiceHashPasswordMock).toHaveBeenCalledTimes(1);
    expect(testResult.id).toBe(1);
    expect(testResult.email).toBe('test@mail.com');
    expect(testResult.name).toBe('testName');
    expect(testResult.secondName).toBe('testSecondName');
    expect(testResult.phoneNumber).toBe('+48123456789');
    expect(testResult.type).toBe('BREEDER');
  });

  it('should throw an exception when user already exists', async () => {
    const prismaUserCreateMock = jest.spyOn(prismaService.user, 'create');

    const userServiceFindUserByEmailMockResult: User = {
      id: 1,
      email: 'test@mail.com',
      name: 'testName',
      secondName: 'testSecondName',
      password: 'testPassword',
      phoneNumber: '+48123456789',
      type: 'BREEDER',
    };

    const userServiceFindUserByEmailMock = jest
      .spyOn(userService, 'findUserByEmail')
      .mockResolvedValue(userServiceFindUserByEmailMockResult);

    const userServiceHashPasswordMock = jest.spyOn(userService, 'hashPassword');

    try {
      await userService.createUser(testUserCorrect);
    } catch (error) {
      expect(prismaUserCreateMock).toHaveBeenCalledTimes(0);
      expect(userServiceFindUserByEmailMock).toHaveBeenCalledTimes(1);
      expect(userServiceHashPasswordMock).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(error.getResponse()).toEqual('User already exists');
    }
  });

  it('should return a user when found by email', async () => {
    const prismaUserFindUniqueMockResult: User = {
      id: 1,
      email: 'test@mail.com',
      name: 'testName',
      secondName: 'testSecondName',
      password: 'testPassword',
      phoneNumber: '+48123456789',
      type: 'BREEDER',
    };

    const prismaUserFindUniqueMock = jest
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValue(prismaUserFindUniqueMockResult);

    const testUserEmail = 'test@email.com';

    const testResult = await userService.findUserByEmail(testUserEmail);

    expect(prismaUserFindUniqueMock).toHaveBeenCalledTimes(1);
    expect(testResult.id).toBe(1);
    expect(testResult.email).toBe('test@mail.com');
    expect(testResult.name).toBe('testName');
    expect(testResult.secondName).toBe('testSecondName');
    expect(testResult.phoneNumber).toBe('+48123456789');
    expect(testResult.type).toBe('BREEDER');
  });

  it('should return null when user is not found by email', async () => {
    const prismaUserFindUniqueMockResult: User | null = null;

    const prismaUserFindUniqueMock = jest
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValue(prismaUserFindUniqueMockResult);

    const testUserEmail = 'test@email.com';

    const testResult = await userService.findUserByEmail(testUserEmail);

    expect(prismaUserFindUniqueMock).toHaveBeenCalledTimes(1);
    expect(testResult).toBe(null);
  });

  it('should return a user when found by id', async () => {
    const prismaUserFindUniqueMockResult: User = {
      id: 1,
      email: 'test@mail.com',
      name: 'testName',
      secondName: 'testSecondName',
      password: 'testPassword',
      phoneNumber: '+48123456789',
      type: 'BREEDER',
    };

    const prismaUserFindUniqueMock = jest
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValue(prismaUserFindUniqueMockResult);

    const testUserId = 1;

    const testResult = await userService.findUserById(testUserId);

    expect(prismaUserFindUniqueMock).toHaveBeenCalledTimes(1);
    expect(testResult.id).toBe(1);
    expect(testResult.email).toBe('test@mail.com');
    expect(testResult.name).toBe('testName');
    expect(testResult.secondName).toBe('testSecondName');
    expect(testResult.phoneNumber).toBe('+48123456789');
    expect(testResult.type).toBe('BREEDER');
  });

  it('should return null when user is not found by id', async () => {
    const prismaUserFindUniqueMockResult: User | null = null;

    const prismaUserFindUniqueMock = jest
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValue(prismaUserFindUniqueMockResult);

    const testUserId = 1;

    const testResult = await userService.findUserById(testUserId);

    expect(prismaUserFindUniqueMock).toHaveBeenCalledTimes(1);
    expect(testResult).toBe(null);
  });

  it('should update user when found', async () => {
    const userServiceFindByIdMockResult: User = {
      id: 1,
      email: 'test@mail.com',
      name: 'testName',
      secondName: 'testSecondName',
      password: 'testPassword',
      phoneNumber: '+48123456789',
      type: 'BREEDER',
    };

    const prismaServiceUserUpdateMockResult: User = {
      id: 1,
      email: 'test@mail.com',
      name: 'testNameUpdated',
      secondName: 'testSecondNameUpdated',
      password: 'testPassword',
      phoneNumber: '+48123456789',
      type: 'BREEDER',
    };

    const userServiceFindByIdMock = jest
      .spyOn(userService, 'findUserById')
      .mockResolvedValue(userServiceFindByIdMockResult);

    const prismaServiceUserUpdateMock = jest
      .spyOn(prismaService.user, 'update')
      .mockResolvedValue(prismaServiceUserUpdateMockResult);

    const testUserId = 1;

    const testResult = await userService.updateUser(testUserId, testUpdateUser);

    expect(userServiceFindByIdMock).toHaveBeenCalledTimes(1);
    expect(prismaServiceUserUpdateMock).toHaveBeenCalledTimes(1);
    expect(testResult.id).toBe(1);
    expect(testResult.email).toBe('test@mail.com');
    expect(testResult.name).toBe('testNameUpdated');
    expect(testResult.secondName).toBe('testSecondNameUpdated');
    expect(testResult.phoneNumber).toBe('+48123456789');
    expect(testResult.type).toBe('BREEDER');
  });

  it('should throw an exception when user is not found while update', async () => {
    const userServiceFindByIdMockResult: User | null = null;

    const userServiceFindByIdMock = jest
      .spyOn(userService, 'findUserById')
      .mockResolvedValue(userServiceFindByIdMockResult);

    const prismaServiceUserUpdateMock = jest.spyOn(
      prismaService.user,
      'update',
    );

    const testUserId = 1;

    try {
      await userService.updateUser(testUserId, testUpdateUser);
    } catch (error) {
      expect(prismaServiceUserUpdateMock).toHaveBeenCalledTimes(0);
      expect(userServiceFindByIdMock).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(error.getResponse()).toEqual('User does not exist');
    }
  });

  it('should throw an exception when user is not found while sending password update request', async () => {
    const userServiceFindByEmailMockResult: User | null = null;

    const userServiceFindByEmailMock = jest
      .spyOn(userService, 'findUserByEmail')
      .mockResolvedValue(userServiceFindByEmailMockResult);

    const tokenServiceGenerateUserPasswordUpdateTokenMock = jest.spyOn(
      tokenService,
      'generateUserPasswordUpdateToken',
    );

    const mailServiceSendMailMock = jest.spyOn(mailService, 'sendMail');

    const testEmail = 'test@email.com';
    try {
      await userService.updatePasswordRequest(testEmail);
    } catch (error) {
      expect(userServiceFindByEmailMock).toHaveBeenCalledTimes(1);
      expect(
        tokenServiceGenerateUserPasswordUpdateTokenMock,
      ).toHaveBeenCalledTimes(0);
      expect(mailServiceSendMailMock).toHaveBeenCalledTimes(0);
    }
  });

  it('should create update password request when user is found', async () => {
    const userServiceFindByEmailMockResult: User = {
      id: 1,
      email: 'test@mail.com',
      name: 'testName',
      secondName: 'testSecondName',
      password: 'testPassword',
      phoneNumber: '+48123456789',
      type: 'BREEDER',
    };

    const tokenServiceGenerateUserPasswordUpdateTokenMockResult: UserPasswordUpdateTokenDTO =
      { userPasswordUpdateToken: 'test.token' };

    const userServiceFindByEmailMock = jest
      .spyOn(userService, 'findUserByEmail')
      .mockResolvedValue(userServiceFindByEmailMockResult);

    const tokenServiceGenerateUserPasswordUpdateTokenMock = jest
      .spyOn(tokenService, 'generateUserPasswordUpdateToken')
      .mockResolvedValue(tokenServiceGenerateUserPasswordUpdateTokenMockResult);

    const mailServiceSendMailMock = jest.spyOn(mailService, 'sendMail');

    const testEmail = 'testEmail';

    await userService.updatePasswordRequest(testEmail);

    expect(userServiceFindByEmailMock).toHaveBeenCalledTimes(1);
    expect(
      tokenServiceGenerateUserPasswordUpdateTokenMock,
    ).toHaveBeenCalledTimes(1);
    expect(mailServiceSendMailMock).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when token is incorrect while updating password', async () => {
    const tokenServiceVerifyUserPasswordTokenMockResult: UserPayload = {
      sub: 1,
      email: 'test@email.com',
    };

    const userServiceFindUserByIdMockResult: User | null = null;

    const tokenServiceVerifyUserPasswordTokenMock = jest
      .spyOn(tokenService, 'verifyUserPasswordUpdateToken')
      .mockResolvedValue(tokenServiceVerifyUserPasswordTokenMockResult);

    const userServiceFindUserByIdMock = jest
      .spyOn(userService, 'findUserById')
      .mockResolvedValue(userServiceFindUserByIdMockResult);

    const userServiceHashPasswordMock = jest.spyOn(userService, 'hashPassword');

    const prismaServiceUserUpdateMock = jest.spyOn(
      prismaService.user,
      'update',
    );

    const testUpdatePassword: UpdatePasswordDTO = {
      token: 'test.token',
      newPassword: 'testNewPassword',
    };

    try {
      await userService.updatePasssoword(
        testUpdatePassword.token,
        testUpdatePassword.newPassword,
      );
    } catch (error) {
      expect(tokenServiceVerifyUserPasswordTokenMock).toHaveBeenCalledTimes(1);
      expect(userServiceFindUserByIdMock).toHaveBeenCalledTimes(1);
      expect(userServiceHashPasswordMock).toHaveBeenCalledTimes(0);
      expect(prismaServiceUserUpdateMock).toHaveBeenCalledTimes(0);
    }
  });

  it('should update password', async () => {
    const tokenServiceVerifyUserPasswordTokenMockResult: UserPayload = {
      sub: 1,
      email: 'test@email.com',
    };

    const userServiceFindUserByIdMockResult: User = {
      id: 1,
      email: 'test@mail.com',
      name: 'testName',
      secondName: 'testSecondName',
      password: 'testPassword',
      phoneNumber: '+48123456789',
      type: 'BREEDER',
    };

    const userServiceHashPasswordMockResult: string = 'testHashedPassword';

    const prismaServiceUserUpdateMockResult: User = {
      id: 1,
      email: 'test@mail.com',
      name: 'testName',
      secondName: 'testSecondName',
      password: 'testPassword',
      phoneNumber: '+48123456789',
      type: 'BREEDER',
    };

    const tokenServiceVerifyUserPasswordTokenMock = jest
      .spyOn(tokenService, 'verifyUserPasswordUpdateToken')
      .mockResolvedValue(tokenServiceVerifyUserPasswordTokenMockResult);

    const userServiceFindUserByIdMock = jest
      .spyOn(userService, 'findUserById')
      .mockResolvedValue(userServiceFindUserByIdMockResult);

    const userServiceHashPasswordMock = jest
      .spyOn(userService, 'hashPassword')
      .mockResolvedValue(userServiceHashPasswordMockResult);

    const prismaServiceUserUpdateMock = jest
      .spyOn(prismaService.user, 'update')
      .mockResolvedValue(prismaServiceUserUpdateMockResult);

    const testUpdatePassword: UpdatePasswordDTO = {
      token: 'test.token',
      newPassword: 'testNewPassword',
    };

    const result = await userService.updatePasssoword(
      testUpdatePassword.token,
      testUpdatePassword.newPassword,
    );

    expect(result).toBe('Password updated succesfully');
    expect(tokenServiceVerifyUserPasswordTokenMock).toHaveBeenCalledTimes(1);
    expect(userServiceFindUserByIdMock).toHaveBeenCalledTimes(1);
    expect(userServiceHashPasswordMock).toHaveBeenCalledTimes(1);
    expect(prismaServiceUserUpdateMock).toHaveBeenCalledTimes(1);
  });
});
