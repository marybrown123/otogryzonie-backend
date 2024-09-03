import { Gender } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateFeaturesDTO {
  @IsString()
  species: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  age: string;

  @IsString()
  color: string;

  @IsString()
  domestication: string;

  @IsString()
  hairLength: string;

  @IsString()
  neutered: string;
}
