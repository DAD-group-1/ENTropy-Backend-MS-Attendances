import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Schedule } from '../external/entities/schedule.entity';
import { Student } from '../external/entities/student.entity';
import { Course } from '../external/entities/course.entity';
import { User } from '../external/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, Course, Schedule, Student, User]),
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
