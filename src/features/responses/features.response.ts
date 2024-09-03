import { ApiProperty } from '@nestjs/swagger';
import { Features, Gender } from '@prisma/client';

export class FeaturesResponse {
  constructor(features: Features) {
    this.id = features.id;
    this.species = features.species;
    this.gender = features.gender;
    this.age = features.age;
    this.color = features.color;
    this.domestication = features.domestication;
    this.hairLength = features.hairLength;
    this.neutered = features.neutered;
  }
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  species: string;

  @ApiProperty({ enum: Gender })
  gender: Gender;

  @ApiProperty({ type: 'string' })
  age: string;

  @ApiProperty({ type: 'string' })
  color: string;

  @ApiProperty({ type: 'string' })
  domestication: string;

  @ApiProperty({ type: 'string' })
  hairLength: string;

  @ApiProperty({ type: 'string' })
  neutered: string;
}
