import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { InternalRoom } from '@dad-group-1/backend-common';
import { RoomType } from './room-type.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Room extends InternalRoom {
  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  roomType: RoomType;
  @OneToMany(() => Schedule, (schedule) => schedule.room)
  schedules: Schedule[];
}
