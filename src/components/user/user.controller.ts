import {
  Body,
  Param,
  Delete,
  Get,
  Patch,
  Post,
  Controller,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import { RoomService } from '../room/room.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {}

  @Get()
  listUsers(): Promise<IUser[]> {
    return this.userService.list();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<IUser> {
    return this.userService.getById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<IUser> {
    return this.userService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.userService.update(id, updateUserDto);
  }

  @Post('/join-to-room')
  async joinToRoom(
    @Body('userId') userId: string,
    @Body('roomId') roomId: string,
  ) {
    return this.userService.joinToRoom(userId, roomId);
  }

  @Post('/leave-from-room')
  async leaveFromRoom(@Body('userId') userId: string): Promise<IUser> {
    return this.userService.leaveFromRoom(userId);
  }

  @Get('/room/:roomId')
  getAllUsersFromRoom(@Param('roomId') roomId: string): Promise<IUser[]> {
    return this.userService.getAllUsersFromRoom(roomId);
  }
}
