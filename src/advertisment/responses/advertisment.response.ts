import {
  Advertisment,
  AdvertismentType,
  Features,
  Rodent,
  User,
} from '@prisma/client';
import { RodentResponse } from 'src/rodent/responses/rodent.response';
import { UserResponse } from 'src/user/responses/user.response';

export class AdvertismentResponse {
  constructor(
    advertisment: Advertisment & { rodent: Rodent & { features: Features } } & {
      user: User;
    },
  ) {
    this.id = advertisment.id;
    this.description = advertisment.description;
    this.type = advertisment.type;
    this.location = advertisment.location;
    this.rodent = new RodentResponse(advertisment.rodent);
    this.user = new UserResponse(advertisment.user);
  }
  id: number;
  description: string;
  type: AdvertismentType;
  location: string;
  rodent: RodentResponse;
  user: UserResponse;
}
