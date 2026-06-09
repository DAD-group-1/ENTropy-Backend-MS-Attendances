import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { InternalUser } from '@dad-group-1/backend-common';
import { Attendance } from '../../attendances/entities/attendance.entity';
import { Campus } from './campus.entity';
import { Role } from './role.entity';

@Entity()
export class User extends InternalUser {
  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances: Attendance[];
  @ManyToOne(() => Campus, (campus) => campus.users)
  @JoinColumn({ name: 'campus_id' })
  campus: Campus;
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
