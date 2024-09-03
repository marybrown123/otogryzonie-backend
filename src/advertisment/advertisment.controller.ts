import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AdvertismentService } from 'src/advertisment/advertisment.service';
import { CreateAdvertismentDTO } from 'src/advertisment/DTOs/advertisment.dto';
import { AdvertismentResponse } from 'src/advertisment/responses/advertisment.response';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';

@ApiTags('advertisment')
@Controller('/advertisment')
export class AdvertismentController {
  constructor(private advertismentService: AdvertismentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create new advertisment' })
  @ApiCreatedResponse({ type: AdvertismentResponse })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createAdvertisment(
    @Body() advertisment: CreateAdvertismentDTO,
    @CurrentUser() user: User,
  ) {
    const userId = user.id;
    return this.advertismentService.createAdvertisment(advertisment, userId);
  }
}
