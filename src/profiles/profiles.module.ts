import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],  
  imports: [
    TypeOrmModule.forFeature([Profile, User])
  ]
})
export class ProfilesModule {}
