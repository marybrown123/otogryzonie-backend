import {
  Advertisment,
  AdvertismentType,
  Features,
  Rodent,
} from '@prisma/client';
import { RodentResponse } from 'src/rodent/responses/rodent.response';

export class AdvertismentResponse {
  constructor(
    advertisment: Advertisment & { rodent: Rodent & { features: Features } },
  ) {
    this.id = advertisment.id;
    this.description = advertisment.description;
    this.type = advertisment.type;
    this.location = advertisment.location;
    this.rodent = new RodentResponse(advertisment.rodent);
  }
  id: number;
  description: string;
  type: AdvertismentType;
  location: string;
  rodent: RodentResponse;
}
