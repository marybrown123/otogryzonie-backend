import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  @ApiProperty({ type: 'string', example: 'example.token' })
  token: string;

  @IsString()
  @ApiProperty({ type: 'string', example: 'examplePassword' })
  newPassword: string;
}
