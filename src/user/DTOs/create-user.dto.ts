import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import { IsEmail, IsEnum, IsString, Length, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsEmail()
  @ApiProperty({ type: 'string', example: 'example@mail.com' })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    type: 'string',
    minLength: 8,
    format: 'password',
    example: 'examplePassword',
  })
  password: string;

  @IsString()
  @ApiProperty({ type: 'string', example: 'ExampleName' })
  name: string;

  @IsString()
  @ApiProperty({ type: 'string', example: 'ExampleSecondName' })
  secondName: string;

  @IsString()
  @Length(12)
  @ApiProperty({
    type: 'string',
    maxLength: 11,
    minLength: 11,
    example: '+48123456789',
  })
  phoneNumber: string;

  @IsString()
  @IsEnum(UserType)
  @ApiProperty({ type: UserType, example: 'BREEDER' })
  type: UserType;
}
