import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdvertismentModule } from 'src/advertisment/advertisment.module';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TokenModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AdvertismentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
