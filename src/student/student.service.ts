import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, UpdateResult } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async create(student: Student): Promise<Student> {
    return await this.studentRepository.save(student);
  }

  async update(id: number, student: Student): Promise<UpdateResult> {
    const existingStudent = await this.studentRepository.findOne({ where: { student_id: id } });
    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return await this.studentRepository.update(id, student);
  }

  async findById(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { student_id: id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async findByName(name: string): Promise<Student[]> {
    return await this.studentRepository.find({
      where: [
        { first_name: Like(`%${name}%`) },
        { last_name: Like(`%${name}%`) },
      ],
    });
  }

  async remove(id: number): Promise<void> {
    const student = await this.studentRepository.findOne({ where: { student_id: id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    await this.studentRepository.delete(id);
  }
}
