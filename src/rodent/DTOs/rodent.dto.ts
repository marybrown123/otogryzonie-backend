import { RodentType } from '@prisma/client';
import { CreateFeaturesDTO } from 'src/features/DTOs/features.dto';

export class CreateRodentDTO {
  name: string;
  type: RodentType;
  features: CreateFeaturesDTO;
}
