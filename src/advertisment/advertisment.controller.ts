import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AdvertismentService } from 'src/advertisment/advertisment.service';
import { CreateAdvertismentDTO } from 'src/advertisment/DTOs/advertisment.dto';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';

@Controller('/advertisment')
export class AdvertismentController {
  constructor(private advertismentService: AdvertismentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createAdvertisment(
    @Body() advertisment: CreateAdvertismentDTO,
    @CurrentUser() user: User,
  ) {
    const userId = user.id;
    return this.advertismentService.createAdvertisment(advertisment, userId);
  }
}
