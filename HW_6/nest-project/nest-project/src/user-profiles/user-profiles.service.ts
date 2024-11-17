import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from '../users/user.entity';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfilesRepository: Repository<UserProfile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>, // UserRepository 추가
  ) {}

  async create(
    createUserProfileDto: CreateUserProfileDto,
    userId: number,
  ): Promise<UserProfile> {
    // 사용자 ID로 전체 User 엔티티 조회
    const completeUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!completeUser) {
      throw new NotFoundException('User not found');
    }

    // UserProfile 생성
    const board = this.userProfilesRepository.create({
      ...createUserProfileDto,
      user: completeUser,
    });
    console.log('Board to save:', board); // 완전한 User 엔티티로 설정된 UserProfile 확인용 로그
    return this.userProfilesRepository.save(board);
  }

  async findAll(): Promise<UserProfile[]> {
    return this.userProfilesRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<UserProfile> {
    const board = await this.userProfilesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  async update(
    id: number,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    await this.userProfilesRepository.update(id, updateUserProfileDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userProfilesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
  }
}
