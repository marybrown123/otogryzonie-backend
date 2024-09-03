import { Injectable } from '@nestjs/common';
import { CreateAdvertismentDTO } from 'src/advertisment/DTOs/advertisment.dto';
import { AdvertismentResponse } from 'src/advertisment/responses/advertisment.response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdvertismentService {
  constructor(private prismaService: PrismaService) {}

  async createAdvertisment(
    advertisment: CreateAdvertismentDTO,
    userId: number,
  ): Promise<AdvertismentResponse> {
    const advertismentFromDb = await this.prismaService.advertisment.create({
      data: {
        description: advertisment.description,
        type: advertisment.type,
        location: advertisment.location,
        rodent: {
          create: {
            name: advertisment.rodent.name,
            type: advertisment.rodent.type,
            features: {
              create: {
                species: advertisment.rodent.features.species,
                gender: advertisment.rodent.features.gender,
                age: advertisment.rodent.features.age,
                color: advertisment.rodent.features.color,
                domestication: advertisment.rodent.features.domestication,
                hairLength: advertisment.rodent.features.hairLength,
                neutered: advertisment.rodent.features.neutered,
              },
            },
          },
        },
        user: {
          connect: { id: userId },
        },
      },
      include: { rodent: { include: { features: true } }, user: true },
    });
    return new AdvertismentResponse(advertismentFromDb);
  }
}
