import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import CreateMessageDto from 'src/components/message/dto/create-message.dto';
import MessageService from 'src/components/message/message.service';
import RoomService from 'src/components/room/room.service';
import UserService from 'src/components/user/user.service';

@WebSocketGateway()
export default class ChatGateway {
  @WebSocketServer() wss: Server;
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
  ) {}

  afterInit(server: Server) {
    console.log('afterInit');
  }
  async handleDisconnect(client: Socket) {
    console.log('handleDisconnect: ', client.id);
  }
  async handleConnection(client: Socket, ...args: any[]) {
    console.log('handleConnection', client.id);
  }

  @SubscribeMessage('clientConnectToRoom')
  async handleMessageForClientConnectToRoom(client: Socket, roomId) {
    const rooms = Object.keys(client.rooms);
    rooms.forEach((roomId) => client.leave(roomId));
    await client.join(`room:${roomId}`);
    const messages = await this.messageService.getAllMessagesByRoom(roomId);
    this.wss.to(`room:${roomId}`).emit('messageList', messages);
  }

  @SubscribeMessage('clientSendMessage')
  async handleMessageForClientSendMessage(
    client: Socket,
    payload: CreateMessageDto,
  ) {
    const newMsg = await this.messageService.create(payload);
    const message = await this.messageService.getById(newMsg._id);
    this.wss.to(`room:${payload.roomId}`).emit('newMessage', message);
  }
}
