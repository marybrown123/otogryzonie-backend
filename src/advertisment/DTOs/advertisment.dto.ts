import { AdvertismentType } from '@prisma/client';
import { CreateRodentDTO } from 'src/rodent/DTOs/rodent.dto';

export class CreateAdvertismentDTO {
  description: string;
  type: AdvertismentType;
  location: string;
  rodent: CreateRodentDTO;
}
