import { Entity, OneToMany } from 'typeorm';
import { InternalRoomType } from '@dad-group-1/backend-common';
import { Room } from './room.entity';

@Entity()
export class RoomType extends InternalRoomType {
  @OneToMany(() => Room, (room) => room.roomType)
  rooms: Room[];
}
