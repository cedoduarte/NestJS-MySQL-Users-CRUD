import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ username: createUserDto.username });
    if (foundUser) {
      throw new BadRequestException("The username already exists");
    }
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    const userArray = await this.userRepository.find();
    return userArray;
  }

  async findOne(id: number): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(`User Not Found, ID = ${id}`);
    }
    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(`User Not Found, ID = ${id}`);
    }
    const updateResult = await this.userRepository.update({ id }, updateUserDto);
    return updateResult;
  }

  async remove(id: number): Promise<UpdateResult> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(`User Not Found, ID = ${id}`);
    }
    const updateResult = await this.userRepository.softDelete({ id });
    return updateResult;
  }
}