import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../shared/entity/User';
import { UserController } from './User.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}