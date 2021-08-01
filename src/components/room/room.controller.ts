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
import { Roles } from '../auth/decorators/role.decorator';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import { rolesEnum } from '../user/enums/roles.enum';
import CreateRoomDto from './dto/create-room.dto';
import UpdateRoomDto from './dto/update-room.dto';
import IRoom from './interfaces/room.interface';
import RoomService from './room.service';

@ApiTags('Rooms')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@Controller('rooms')
export default class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // @Roles(rolesEnum.admin)
  @Get('/')
  async listRooms(): Promise<IRoom[]> {
    return this.roomService.list();
  }

  @Get('/:id')
  async getRoomById(@Param('id') id: string): Promise<IRoom> {
    return this.roomService.getById(id);
  }

  @ApiBody({ type: CreateRoomDto })
  @Post('/')
  async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<IRoom> {
    return this.roomService.create(createRoomDto);
  }

  @Delete('/:id')
  async removeRoom(@Param('id') id: string): Promise<IRoom> {
    return this.roomService.remove(id);
  }

  @ApiBody({ type: UpdateRoomDto })
  @Patch('/:id')
  async updateRoom(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<IRoom> {
    return this.roomService.update(id, updateRoomDto);
  }

  @Get('/by-user/:ownerId')
  async getAllRoomsByUser(@Param('ownerId') ownerId: string): Promise<IRoom[]> {
    return this.roomService.getAllRoomsByUser(ownerId);
  }
}
