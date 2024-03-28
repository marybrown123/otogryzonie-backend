import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLoginDTO {
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
}
