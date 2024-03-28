import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, AuthModule, TokenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
