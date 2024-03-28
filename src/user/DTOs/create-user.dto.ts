import { UserType } from '@prisma/client';

export class CreateUserDTO {
  email: string;
  password: string;
  name: string;
  secondNAme: string;
  phoneNumber: string;
  type: UserType;
}
