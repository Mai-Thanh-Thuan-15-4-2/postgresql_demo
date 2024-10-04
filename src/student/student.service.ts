import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, UpdateResult  } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  create(student: Student): Promise<Student> {
    return this.studentRepository.save(student);
  }

  update(id: number, student: Student): Promise<UpdateResult> {
    return this.studentRepository.update(id, student);
  }

  findById(id: number): Promise<Student> {
    return this.studentRepository.findOne({ where: { student_id: id } });
  }

  findByName(name: string): Promise<Student[]> {
    return this.studentRepository.find({
      where: [
        { first_name: Like(`%${name}%`) },
        { last_name: Like(`%${name}%`) },
      ],
    });
  }
  remove(id: number): Promise<void> {
    return this.studentRepository.delete(id).then(() => {});
  }
}
