import { ApiProperty } from '@nestjs/swagger';
import { User, UserType } from '@prisma/client';

export class UserResponse implements Omit<User, 'password'> {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.secondName = user.secondName;
    this.phoneNumber = user.phoneNumber;
    this.type = user.type;
  }
  @ApiProperty({ type: 'number', example: 1 })
  id: number;

  @ApiProperty({ type: 'string', example: 'example@mail.com' })
  email: string;

  @ApiProperty({ type: 'string', example: 'ExampleName' })
  name: string;

  @ApiProperty({ type: 'string', example: 'ExampleSecondName' })
  secondName: string;

  @ApiProperty({ type: 'string', example: '+48123456789' })
  phoneNumber: string;

  @ApiProperty({ type: UserType, example: 'BREEDER' })
  type: UserType;
}
