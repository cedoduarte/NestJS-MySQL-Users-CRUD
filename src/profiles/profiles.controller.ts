import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { UpdateResult } from 'typeorm';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profilesService.create(userId, createProfileDto);
  }

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profilesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Profile> {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto): Promise<UpdateResult> {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<UpdateResult> {
    return this.profilesService.remove(id);
  }
}
