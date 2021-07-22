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
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
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

  @ApiBody({ type: CreateUserDto })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<IUser> {
    return this.userService.remove(id);
  }

  @ApiBody({ type: UpdateUserDto })
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
