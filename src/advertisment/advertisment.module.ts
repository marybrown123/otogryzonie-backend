import { Module } from '@nestjs/common';
import { AdvertismentController } from 'src/advertisment/advertisment.controller';
import { AdvertismentService } from 'src/advertisment/advertisment.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [AdvertismentService, PrismaService],
  exports: [AdvertismentService],
  controllers: [AdvertismentController],
})
export class AdvertismentModule {}
