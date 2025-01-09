import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string', example: 'example@mail.com' })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string', example: 'ExampleName' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string', example: 'ExampleSecondName' })
  secondName?: string;

  @IsString()
  @Length(12)
  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    maxLength: 11,
    minLength: 11,
    example: '+48123456789',
  })
  phoneNumber?: string;
}
