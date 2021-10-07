import {
  Body,
  Get,
  Post,
  Param,
  Controller,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from '.prisma/client';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
  @Get(':username')
  findUnique(@Param('username') username: string): Promise<User> {
    return this.service.findUnique(username);
  }
  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }
  @Delete('/delete/:username')
  remove(@Param('username') username: string) {
    return this.service.remove(username);
  }
  @Get('list')
  findMany(): Promise<User[]> {
    return this.service.findAll();
  }
}
