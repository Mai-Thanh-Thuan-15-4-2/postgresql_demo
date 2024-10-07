import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UseFilters, NotFoundException, ValidationPipe, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentService } from '../services/student.service';
import { Student } from '../entities/student.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { UpdateResult } from 'typeorm';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CreateStudentDto, UpdateStudentDto } from '../dto/student.dto';
import { ERROR_MESSAGES } from '../../constants/enums/error-massage.enum';
import { StudentResponseDto } from '../dto/student-response.dto';
import { LoggerService } from '../../constants/services/logger.service';
;

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(HttpExceptionFilter)
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly logger: LoggerService // Inject LoggerService
  ) {
    this.logger.log('StudentController initialized');
  }

  @Get()
  async findAll(@Query('page') page: number = 0, @Query('limit') limit: number = 10): Promise<Student[]> {
    this.logger.log(`Fetching students, page: ${page}, limit: ${limit}`);
    return this.studentService.findAll({ page, limit });
  }

  @Post('create')
  @Roles('admin')
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    this.logger.log(`Creating student with data: ${JSON.stringify(createStudentDto)}`);
    return this.studentService.create(createStudentDto);
  }

  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: number, @Body(new ValidationPipe()) updateStudentDto: UpdateStudentDto): Promise<UpdateResult> {
    const student = await this.studentService.findById(id);
    if (!student) {
      this.logger.error(`Student with ID ${id} not found`, 'NotFoundException');
      throw new NotFoundException({ message: ERROR_MESSAGES.VALIDATION_EXIT_CODE[3006] });
    }
    this.logger.log(`Updating student with ID ${id}`);
    return this.studentService.update(id, updateStudentDto);
  }

  @Get('search')
  async findByName(
    @Query('name') name: string,
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10
  ): Promise<StudentResponseDto[]> {
    this.logger.log(`Searching students by name: ${name}, page: ${page}, limit: ${limit}`);
    const students = await this.studentService.findByName(name, page, limit);
    return students.map(student => ({
      id: student.student_id,
      firstName: student.first_name,
      lastName: student.last_name,
      email: student.email,
      gender: student.gender,
      partTimeJob: student.part_time_job,
      absenceDays: student.absence_days,
      extracurricularActivities: student.extracurricular_activities,
      weeklySelfStudyHours: student.weekly_self_study_hours,
      careerAspiration: student.career_aspiration,
      mathScore: student.math_score,
      historyScore: student.history_score,
      physicsScore: student.physics_score,
      chemistryScore: student.chemistry_score,
      biologyScore: student.biology_score,
      englishScore: student.english_score,
      geographyScore: student.geography_score,
    }));
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Student> {
    const student = await this.studentService.findById(id);
    if (!student) {
      this.logger.error(`Student with ID ${id} not found`, 'NotFoundException');
      throw new NotFoundException({ message: ERROR_MESSAGES.VALIDATION_EXIT_CODE[3006] });
    }
    this.logger.log(`Fetching student with ID ${id}`);
    return student;
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    this.logger.log(`Deleting student with ID ${id}`);
    await this.studentService.remove(id);
    return { success: true };
  }
  @Post('import')
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  async importStudents(@UploadedFile() file: Express.Multer.File): Promise<{ success: boolean }> {
    if (!file || !file.buffer) {
      this.logger.error('File or file buffer missing at controller level.', 'BadRequestException');
      throw new BadRequestException({ message: ERROR_MESSAGES.FILE_EXIT_CODE[5012] });
    }
    this.logger.log('Importing students from Excel file.');
    await this.studentService.importStudentsFromExcel(file.buffer);
    return { success: true };
  }  
}
