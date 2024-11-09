import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfilesService } from './user-profiles.service';
import { UserProfilesController } from './user-profiles.controller';
import { UserProfile } from './user-profile.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile]), UsersModule],
  providers: [UserProfilesService],
  controllers: [UserProfilesController],
  exports: [UserProfilesService, TypeOrmModule], // UsersService와 UserRepository를 다른 모듈에서 사용할 수 있도록 export
})
export class UserProfilesModule {}
