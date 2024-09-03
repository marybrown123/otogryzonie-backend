import { ApiProperty } from '@nestjs/swagger';
import { AdvertismentType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { CreateRodentDTO } from 'src/rodent/DTOs/rodent.dto';

export class CreateAdvertismentDTO {
  @IsString()
  @ApiProperty({ type: 'string' })
  description: string;

  @IsEnum(AdvertismentType)
  @ApiProperty({ enum: AdvertismentType })
  type: AdvertismentType;

  @IsString()
  @ApiProperty({ type: 'string' })
  location: string;

  @ValidateNested()
  @Type(() => CreateRodentDTO)
  @ApiProperty({ type: CreateRodentDTO })
  rodent: CreateRodentDTO;
}
