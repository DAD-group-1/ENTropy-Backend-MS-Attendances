import { Controller, Logger } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateAttendanceRequestDto,
  PaginationQueryDto,
  SearchPaginationQueryDto,
  UpdateAttendanceRequestDto,
} from '@dad-group-1/backend-common';

@Controller('attendances')
export class AttendanceController {
  private readonly logger = new Logger(AttendanceController.name);
  constructor(private readonly attendanceService: AttendanceService) {}

  @MessagePattern({ cmd: 'create_attendance' })
  async create(@Payload() data: CreateAttendanceRequestDto) {
    return this.attendanceService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_attendances' })
  findAll(query: PaginationQueryDto) {
    return this.attendanceService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_attendance' })
  findOne(@Payload() id: number) {
    return this.attendanceService.findOne(id);
  }

  @MessagePattern({ cmd: 'find_attendances_by_student' })
  findByStudentId(
    @Payload()
    payload: SearchPaginationQueryDto,
  ) {
    return this.attendanceService.findByStudent(payload.id, payload.query);
  }

  @MessagePattern({ cmd: 'update_attendance' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateAttendanceRequestDto;
    },
  ) {
    return this.attendanceService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_attendance' })
  remove(@Payload() id: number) {
    return this.attendanceService.remove(id);
  }
}
