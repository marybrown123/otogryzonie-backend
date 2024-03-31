import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDTO } from '../../DTOs/create-user.dto';
import { UserService } from '../../user.service';
import { HttpException, HttpStatus } from '@nestjs/common';

const testUserCorrect: CreateUserDTO = {
  email: 'test@mail.com',
  name: 'testName',
  secondName: 'testSecondName',
  password: 'testPassword',
  phoneNumber: '+48123456789',
  type: 'BREEDER',
};

describe('UserService', () => {
  let prismaService: PrismaService;
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UserService],
    }).compile();

    await module.createNestApplication().init();
    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
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

    const userServiceFindUserByEmailMockResult: User = null;

    const userServiceFindUserByEmailMock = jest
      .spyOn(userService, 'findUserByEmail')
      .mockResolvedValue(userServiceFindUserByEmailMockResult);

    const userServiceHashPasswordMockResult = 'testPasswordMock';

    const userServiceHashPasswordMock = jest
      .spyOn(userService, 'hashPassword')
      .mockResolvedValue(userServiceHashPasswordMockResult);

    const testResult = await userService.createUser(testUserCorrect);

    expect(prismaUserCreateMock).toHaveBeenCalledTimes(1);
    expect(userServiceFindUserByEmailMock).toHaveBeenCalledTimes(1);
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
    const prismaUserFindUniqueMockResult: User = null;

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
    const prismaUserFindUniqueMockResult: User = null;

    const prismaUserFindUniqueMock = jest
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValue(prismaUserFindUniqueMockResult);

    const testUserId = 1;

    const testResult = await userService.findUserById(testUserId);

    expect(prismaUserFindUniqueMock).toHaveBeenCalledTimes(1);
    expect(testResult).toBe(null);
  });
});
