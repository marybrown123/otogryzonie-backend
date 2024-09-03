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
  id: number;
  species: string;
  gender: Gender;
  age: string;
  color: string;
  domestication: string;
  hairLength: string;
  neutered: string;
}
