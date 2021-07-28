import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import CreateRoomDto from './dto/create-room.dto';
import UpdateRoomDto from './dto/update-room.dto';
import IRoom from './interfaces/room.interface';
import RoomService from './room.service';

@ApiTags('Rooms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('rooms')
export default class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  listRooms(): Promise<IRoom[]> {
    return this.roomService.list();
  }

  @Get(':id')
  getRoomById(@Param('id') id: string): Promise<IRoom> {
    return this.roomService.getById(id);
  }

  @ApiBody({ type: CreateRoomDto })
  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto): Promise<IRoom> {
    return this.roomService.create(createRoomDto);
  }

  @Delete(':id')
  removeRoom(@Param('id') id: string): Promise<IRoom> {
    return this.roomService.remove(id);
  }

  @ApiBody({ type: UpdateRoomDto })
  @Patch('update/:id')
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
