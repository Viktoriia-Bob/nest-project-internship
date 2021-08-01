import {
  Body,
  Param,
  Delete,
  Get,
  Patch,
  Post,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import UpdateUserDto from './dto/update-user.dto';
import IUser from './interfaces/user.interface';
import UserService from './user.service';
import JoinToRoomDto from './dto/join-to-room.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { rolesEnum } from './enums/roles.enum';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  // @Roles(rolesEnum.admin)
  @Get('/')
  async listUsers(): Promise<IUser[]> {
    return this.userService.list();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<IUser> {
    return this.userService.getById(id);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string): Promise<IUser> {
    return this.userService.remove(id);
  }

  @ApiBody({ type: UpdateUserDto })
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBody({ type: JoinToRoomDto })
  @Post('/join-to-room')
  async joinToRoom(@Body() joinToRoomDto: JoinToRoomDto) {
    return this.userService.joinToRoom(joinToRoomDto);
  }

  @Post('/leave-from-room')
  async leaveFromRoom(@Body('userId') userId: string): Promise<IUser> {
    return this.userService.leaveFromRoom(userId);
  }

  @Get('/room/:roomId')
  async getAllUsersFromRoom(@Param('roomId') roomId: string): Promise<IUser[]> {
    return this.userService.getAllUsersFromRoom(roomId);
  }
}
