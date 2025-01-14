import { Module } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  providers: [UserService, PrismaService, TokenService, MailService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
