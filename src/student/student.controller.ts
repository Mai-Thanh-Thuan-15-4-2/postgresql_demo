import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UseFilters, NotFoundException  } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Roles } from '../auth/jwt/roles.decorator';
import { UpdateResult } from 'typeorm';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(HttpExceptionFilter)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll(); // TODO: E làm thêm phần phân trang cho API này nha
  }

  @Post()
  @Roles('admin')
  create(@Body() student: Student): Promise<Student> { //TODO: student này e nên tạo ra 1 file dto riêng
    return this.studentService.create(student);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() student: Student): Promise<UpdateResult> {
    return this.studentService.update(id, student);
    //TODO: này e phải kiểm tra nó trc rồi mới update nha
  }

  @Get('search')
  findByName(@Query('name') name: string): Promise<Student[]> {
    return this.studentService.findByName(name);
    //TODO: này e nên format lại data trả về chứ hok phải select * from student where ... rồi trả về, nó có nhều field không cần thiết
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Student> {
    const student = this.studentService.findById(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`); 
    }
    return student;
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number): Promise<void> { //TODO: sao này e không trả về 1 cái gì cả
    return this.studentService.remove(id);
  }
}