import { ApiProperty } from '@nestjs/swagger';
import { RodentType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { CreateFeaturesDTO } from 'src/features/DTOs/features.dto';

export class CreateRodentDTO {
  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

  @IsEnum(RodentType)
  @ApiProperty({ enum: RodentType })
  type: RodentType;

  @ValidateNested()
  @Type(() => CreateFeaturesDTO)
  @ApiProperty({ type: CreateFeaturesDTO })
  features: CreateFeaturesDTO;
}
