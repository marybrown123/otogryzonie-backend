import { Module } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [],
  providers: [TokenService],
  exports: [TokenService],
  controllers: [],
})
export class TokenModule {}
