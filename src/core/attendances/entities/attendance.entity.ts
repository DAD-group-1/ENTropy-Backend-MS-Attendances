import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { InternalAttendance } from '@dad-group-1/backend-common';
import { Schedule } from '../../external/entities/schedule.entity';
import { Student } from '../../external/entities/student.entity';

@Entity()
export class Attendance extends InternalAttendance {
  @ManyToOne(() => Schedule, (schedule) => schedule.id)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;
  @ManyToOne(() => Student, (student) => student.user_id)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
