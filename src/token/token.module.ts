import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [TokenService],
  exports: [TokenService, JwtModule],
  controllers: [],
})
export class TokenModule {}
