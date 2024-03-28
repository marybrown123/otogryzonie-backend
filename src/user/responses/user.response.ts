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
  id: number;
  email: string;
  name: string;
  secondName: string;
  phoneNumber: string;
  type: UserType;
}
