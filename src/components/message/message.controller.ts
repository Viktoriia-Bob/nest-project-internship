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
import CreateMessageDto from './dto/create-message.dto';
import UpdateMessageDto from './dto/update-message.dto';
import IMessage from './interfaces/message.interface';
import MessageService from './message.service';

@ApiTags('Messages')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@Controller('messages')
export default class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // @Roles(rolesEnum.admin)
  @Get()
  listMessages(): Promise<IMessage[]> {
    return this.messageService.list();
  }

  @Get(':id')
  getMessageById(@Param('id') id: string): Promise<IMessage> {
    return this.messageService.getById(id);
  }

  @ApiBody({ type: CreateMessageDto })
  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto): Promise<IMessage> {
    return this.messageService.create(createMessageDto);
  }

  @Delete(':id')
  removeMessage(@Param('id') id: string): Promise<IMessage> {
    return this.messageService.remove(id);
  }

  @ApiBody({ type: UpdateMessageDto })
  @Patch(':id')
  updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<IMessage> {
    return this.messageService.update(id, updateMessageDto);
  }

  @Get('/by-user/:ownerId')
  getAllMessagesByUser(@Param('ownerId') ownerId: string): Promise<IMessage[]> {
    return this.messageService.getAllMessagesByUser(ownerId);
  }

  @Get('/by-room/:roomId')
  getAllMessagesByRoom(@Param('roomId') roomId: string): Promise<IMessage[]> {
    return this.messageService.getAllMessagesByRoom(roomId);
  }
}
