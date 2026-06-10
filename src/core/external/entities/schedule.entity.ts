import { InternalSchedule } from '@dad-group-1/backend-common';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { Attendance } from '../../attendances/entities/attendance.entity';
import { Instructor } from './instructor.entity';
import { Room } from './room.entity';

@Entity()
export class Schedule extends InternalSchedule {
  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: 'course_id' })
  course: Course;
  @OneToMany(() => Attendance, (attendance) => attendance.schedule)
  attendances: Attendance[];
  @ManyToOne(() => Instructor, (instructor) => instructor.schedules)
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;
  @ManyToOne(() => Room, (room) => room.schedules)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
