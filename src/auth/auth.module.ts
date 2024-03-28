import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, PassportModule, TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
