import { Module } from '@nestjs/common';
import { UsersService } from './services/Admins/users.service';
import { singleUserService } from './services/User/singleUser.service';
import { UsersController } from './controller/Admins/users.controller';
import { singleUserController } from './controller/User/singleUser.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [
    UsersController, 
    singleUserController
  ],
  providers: [
    UsersService, 
    singleUserService
  ],
})
export class UsersModule {}
