import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Schedule } from '../external/entities/schedule.entity';
import { Student } from '../external/entities/student.entity';
import { Course } from '../external/entities/course.entity';
import { User } from '../external/entities/user.entity';
import { Campus } from '../external/entities/campus.entity';
import { Role } from '../external/entities/role.entity';
import { Department } from '../external/entities/department.entity';
import { Room } from '../external/entities/room.entity';
import { Instructor } from '../external/entities/instructor.entity';
import { Specialization } from '../external/entities/specialization.entity';
import { RoomType } from '../external/entities/room-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attendance,
      Course,
      Schedule,
      Student,
      User,
      Campus,
      Role,
      Department,
      Room,
      Instructor,
      Specialization,
      RoomType,
    ]),
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
