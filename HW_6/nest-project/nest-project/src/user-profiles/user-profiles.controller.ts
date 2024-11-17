import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { UserProfile } from './user-profile.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createUserProfileDto: CreateUserProfileDto,
    @Request() req,
  ): Promise<UserProfile> {
    console.log('User from request:', req.user); // 디버그용 로그
    return this.userProfilesService.create(
      createUserProfileDto,
      req.user.userId,
    ); // userId만 전달
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<UserProfile[]> {
    return this.userProfilesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserProfile> {
    return this.userProfilesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfilesService.update(id, updateUserProfileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userProfilesService.remove(id);
  }
}
