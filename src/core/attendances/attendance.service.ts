import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AttendanceListResponseDto,
  AttendanceResponseDto,
  CreateAttendanceRequestDto,
  PaginationQueryDto,
  UpdateAttendanceRequestDto,
} from '@dad-group-1/backend-common';
import { RpcException } from '@nestjs/microservices';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  private readonly logger = new Logger(AttendanceService.name);

  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async create(
    createData: CreateAttendanceRequestDto,
  ): Promise<AttendanceResponseDto> {
    const attendance = this.attendanceRepository.create(createData);
    return await this.attendanceRepository.save(attendance);
  }

  async findAll(query: PaginationQueryDto): Promise<AttendanceListResponseDto> {
    const { page, limit } = query;
    const skip = (page! - 1) * limit!;

    const [data, total] = await this.attendanceRepository.findAndCount({
      relations: { student: true },
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new AttendanceListResponseDto(data, total, page!, limit!);
  }

  async findOne(id: number): Promise<AttendanceResponseDto | null> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id: id },
      relations: { student: true, schedule: true },
    });

    if (!attendance) {
      throw new RpcException({
        message: `Instructor with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    return attendance;
  }

  async update(
    id: number,
    updateData: UpdateAttendanceRequestDto,
  ): Promise<AttendanceResponseDto | null> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id: id },
    });
    if (!attendance) {
      this.logger.error(`Attendance with ID ${id} not found for update`);
      throw new RpcException({
        message: `Attendance with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    this.attendanceRepository.merge(attendance, updateData);
    return await this.attendanceRepository.save(attendance);
  }

  async remove(id: number): Promise<AttendanceResponseDto | null> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id: id },
    });
    if (!attendance) {
      this.logger.error(`Attendance with ID ${id} not found for deletion`);
      throw new RpcException({
        message: `Attendance with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    await this.attendanceRepository.remove(attendance);
    return attendance;
  }
}
