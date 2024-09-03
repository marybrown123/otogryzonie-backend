import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateFeaturesDTO {
  @IsString()
  @ApiProperty({ type: 'string' })
  species: string;

  @IsEnum(Gender)
  @ApiProperty({ enum: Gender })
  gender: Gender;

  @IsString()
  @ApiProperty({ type: 'string' })
  age: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  color: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  domestication: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  hairLength: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  neutered: string;
}
