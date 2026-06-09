import { InternalSchedule } from '@dad-group-1/backend-common';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { Attendance } from '../../attendances/entities/attendance.entity';

@Entity()
export class Schedule extends InternalSchedule {
  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: 'course_id' })
  course: Course;
  @OneToMany(() => Attendance, (attendance) => attendance.schedule)
  attendances: Attendance[];
}
