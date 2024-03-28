import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsString,
  Length,
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
  @Length(12)
  phoneNumber: string;

  @ValidateNested()
  type: UserType;
}
