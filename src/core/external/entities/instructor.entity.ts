import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { InternalInstructor } from '@dad-group-1/backend-common';
import { User } from './user.entity';
import { Schedule } from './schedule.entity';
import { Specialization } from './specialization.entity';
import { Department } from './department.entity';

@Entity()
export class Instructor extends InternalInstructor {
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @OneToMany(() => Schedule, (schedule) => schedule.instructor)
  schedules: Schedule[];
  @ManyToOne(
    () => Specialization,
    (specialization) => specialization.instructors,
  )
  @JoinColumn({ name: 'specialization_id' })
  specialization: Specialization;
  @ManyToOne(() => Department, (department) => department.instructors)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
