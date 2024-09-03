import { Features, Rodent, RodentType } from '@prisma/client';
import { FeaturesResponse } from 'src/features/responses/features.response';

export class RodentResponse {
  constructor(rodent: Rodent & { features: Features }) {
    this.id = rodent.id;
    this.name = rodent.name;
    this.type = rodent.type;
    this.features = new FeaturesResponse(rodent.features);
  }
  id: number;
  name: string;
  type: RodentType;
  features: FeaturesResponse;
}
