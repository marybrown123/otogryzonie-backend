import { AdvertismentType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { CreateRodentDTO } from 'src/rodent/DTOs/rodent.dto';

export class CreateAdvertismentDTO {
  @IsString()
  description: string;

  @IsEnum(AdvertismentType)
  type: AdvertismentType;

  @IsString()
  location: string;

  @ValidateNested()
  @Type(() => CreateRodentDTO)
  rodent: CreateRodentDTO;
}
