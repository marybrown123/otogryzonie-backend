import { Module } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
