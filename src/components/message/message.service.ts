import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import CreateMessageDto from './dto/create-message.dto';
import UpdateMessageDto from './dto/update-message.dto';
import MessageEntity from './entities/message.entity';
import IMessage from './interfaces/message.interface';

@Injectable()
export default class MessageService {
  constructor(
    @InjectModel('Message') private messageRepository: Model<MessageEntity>,
  ) {}

  async list(): Promise<IMessage[]> {
    return this.messageRepository
      .find()
      .limit(20)
      .sort({ createdAt: 1 })
      .populate('ownerId')
      .populate('roomId')
      .lean();
  }

  async getById(id: string): Promise<IMessage> {
    return this.messageRepository
      .findById(Types.ObjectId(id))
      .populate('ownerId')
      .populate('roomId')
      .lean();
  }

  async create(createMessageDto: CreateMessageDto): Promise<IMessage> {
    return this.messageRepository.create(createMessageDto);
  }

  async remove(id: string): Promise<IMessage> {
    return this.messageRepository.findByIdAndRemove(Types.ObjectId(id));
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<IMessage> {
    return this.messageRepository.findByIdAndUpdate(
      Types.ObjectId(id),
      updateMessageDto,
      {
        new: true,
      },
    );
  }

  async getAllMessagesByUser(ownerId: string): Promise<IMessage[]> {
    return this.messageRepository
      .find({ ownerId })
      .limit(20)
      .sort({ createdAt: 1 })
      .populate('ownerId')
      .populate('roomId')
      .lean();
  }

  async getAllMessagesByRoom(roomId: string): Promise<IMessage[]> {
    return this.messageRepository
      .find({ roomId })
      .limit(20)
      .sort({ createdAt: 1 })
      .populate('ownerId')
      .populate('roomId')
      .lean();
  }
}
