import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { IRoom } from './interfaces/room.interface';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private roomRepository: Model<RoomEntity>) {}

  async list(): Promise<IRoom[]> {
    return this.roomRepository
      .find()
      .limit(20)
      .sort({ title: 1 })
      .populate('ownerId')
      .lean();
  }

  async getById(id: string): Promise<IRoom> {
    return this.roomRepository
      .findById(Types.ObjectId(id))
      .populate('ownerId')
      .lean();
  }

  async create(createRoomDto: CreateRoomDto): Promise<IRoom> {
    const newRoom = new this.roomRepository(createRoomDto);
    return newRoom.save();
  }

  async remove(id: string): Promise<IRoom> {
    return this.roomRepository.findByIdAndRemove(Types.ObjectId(id));
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<IRoom> {
    return this.roomRepository.findByIdAndUpdate(
      Types.ObjectId(id),
      updateRoomDto,
      { new: true },
    );
  }

  async getAllRoomsByUser(ownerId: string): Promise<IRoom[]> {
    return this.roomRepository
      .find({ ownerId })
      .limit(20)
      .sort({ title: 1 })
      .populate('ownerId')
      .lean();
  }

  async leaveUserFromRoom(roomId: Types.ObjectId, userId: string) {
    return this.roomRepository.findByIdAndUpdate(
      roomId,
      { $pull: { usersId: Types.ObjectId(userId) } },
      { new: true },
    );
  }

  async joinUserToRoom(roomId: string, userId: string) {
    return this.roomRepository.findByIdAndUpdate(
      Types.ObjectId(roomId),
      { $addToSet: { usersId: Types.ObjectId(userId) } },
      { new: true },
    );
  }
}
