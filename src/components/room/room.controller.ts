import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { IRoom } from './interfaces/room.interface';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  @Get()
  listRooms(): Promise<IRoom[]> {
    return this.roomService.list();
  }

  @Get(':id')
  getRoomById(@Param('id') id: string): Promise<IRoom> {
    return this.roomService.getById(id);
  }

  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto): Promise<IRoom> {
    return this.roomService.create(createRoomDto);
  }

  @Delete(':id')
  removeRoom(@Param('id') id: string): Promise<IRoom> {
    this.userService.removeAllUsersFromRoom(id);
    return this.roomService.remove(id);
  }

  @Patch(':id')
  updateRoom(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<IRoom> {
    return this.roomService.update(id, updateRoomDto);
  }

  @Get('/by-user/:ownerId')
  getAllRoomsByUser(@Param('ownerId') ownerId: string): Promise<IRoom[]> {
    return this.roomService.getAllRoomsByUser(ownerId);
  }
}
