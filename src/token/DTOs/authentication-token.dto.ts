import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationTokenDTO {
  @ApiProperty({ type: 'string', example: 'example.authentication.token' })
  authenticationToken: string;
}
