import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProfilesService {
  constructor(@InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
              @InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(userId: number, createProfileDto: CreateProfileDto): Promise<Profile> {
    const foundUser = await this.userRepository.findOneBy({ id: userId });
    if (!foundUser) {
      throw new NotFoundException(`User Not Found, ID = ${userId}`);
    }
    const newProfile = await this.profileRepository.create(createProfileDto);
    const savedProfile = await this.profileRepository.save(newProfile);
    foundUser.profile = savedProfile;
    await this.userRepository.save(foundUser);
    return savedProfile;
  }

  async findAll(): Promise<Profile[]> {
    const profileArray = await this.profileRepository.find();
    return profileArray;
  }

  async findOne(id: number): Promise<Profile> {
    const foundProfile = await this.profileRepository.findOneBy({ id });
    if (!foundProfile) {
      throw new NotFoundException(`Profile Not Found, ID = ${id}`);
    }
    return foundProfile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<UpdateResult> {
    const foundProfile = await this.profileRepository.findOneBy({ id });
    if (!foundProfile) {
      throw new NotFoundException(`Profile Not Found, ID = ${id}`);
    }
    const updateResult = await this.profileRepository.update({ id }, updateProfileDto);
    return updateResult;
  }

  async remove(id: number): Promise<UpdateResult> {
    const foundProfile = await this.profileRepository.findOneBy({ id });
    if (!foundProfile) {
      throw new NotFoundException(`Profile Not Found, ID = ${id}`);
    }
    const updateResult = await this.profileRepository.softDelete({ id });
    return updateResult;
  }
}
