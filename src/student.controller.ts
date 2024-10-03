import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { AuthGuard } from './auth/auth.guard';

@Controller('students')
@UseGuards(AuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Post()
  create(@Body() student: Student): Promise<Student> {
    return this.studentService.create(student);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() student: Student): Promise<void> {
    return this.studentService.update(id, student);
  }

  @Get('search')
  findByName(@Query('name') name: string): Promise<Student[]> {
    return this.studentService.findByName(name);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Student> {
    return this.studentService.findById(id);
  }
}
