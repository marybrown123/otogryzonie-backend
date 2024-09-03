import { ApiProperty } from '@nestjs/swagger';
import { Features, Rodent, RodentType } from '@prisma/client';
import { FeaturesResponse } from 'src/features/responses/features.response';

export class RodentResponse {
  constructor(rodent: Rodent & { features: Features }) {
    this.id = rodent.id;
    this.name = rodent.name;
    this.type = rodent.type;
    this.features = new FeaturesResponse(rodent.features);
  }
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ enum: RodentType })
  type: RodentType;

  @ApiProperty({ type: FeaturesResponse })
  features: FeaturesResponse;
}
