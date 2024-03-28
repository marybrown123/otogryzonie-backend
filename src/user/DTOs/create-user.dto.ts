import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  name: string;

  @IsString()
  secondName: string;

  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @ValidateNested()
  type: UserType;
}
