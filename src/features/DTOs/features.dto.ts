import { Gender } from '@prisma/client';

export class CreateFeaturesDTO {
  species: string;
  gender: Gender;
  age: string;
  color: string;
  domestication: string;
  hairLength: string;
  neutered: string;
}
