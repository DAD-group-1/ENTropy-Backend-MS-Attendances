import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { InternalAttendance } from '@dad-group-1/backend-common';
import { Schedule } from '../../external/entities/schedule.entity';
import { User } from '../../external/entities/user.entity';

@Entity()
export class Attendance extends InternalAttendance {
  @ManyToOne(() => Schedule, (schedule) => schedule.attendances)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;
  @ManyToOne(() => User, (user) => user.attendances)
  @JoinColumn({ name: 'student_id' })
  user: User;
}
