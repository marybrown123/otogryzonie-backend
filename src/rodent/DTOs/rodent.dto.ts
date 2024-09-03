import { RodentType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { CreateFeaturesDTO } from 'src/features/DTOs/features.dto';

export class CreateRodentDTO {
  @IsString()
  name: string;

  @IsEnum(RodentType)
  type: RodentType;

  @ValidateNested()
  @Type(() => CreateFeaturesDTO)
  features: CreateFeaturesDTO;
}
