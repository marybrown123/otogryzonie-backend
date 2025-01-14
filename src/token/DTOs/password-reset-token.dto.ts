import { ApiProperty } from '@nestjs/swagger';

export class UserPasswordUpdateTokenDTO {
  @ApiProperty({ type: 'string', example: 'example.password.reset.token' })
  userPasswordUpdateToken: string;
}
