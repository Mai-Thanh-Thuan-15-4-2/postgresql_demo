import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, UpdateResult } from 'typeorm';
import { Student } from '../entities/student.entity';
import { CreateStudentDto, UpdateStudentDto } from '../dto/student.dto';
import { ERROR_MESSAGES } from '../../constants/enums/error-massage.enum';
import * as xlsx from 'xlsx';
import { formatExcelDate } from '../../constants/functions/format-date';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) { }

  async findAll({ page, limit }): Promise<Student[]> {
    const offset = page * limit;
    return this.studentRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = new Student();
    student.first_name = createStudentDto.firstName;
    student.last_name = createStudentDto.lastName;
    student.email = createStudentDto.email;
    student.gender = createStudentDto.gender;
    student.part_time_job = createStudentDto.partTimeJob;
    student.absence_days = createStudentDto.absenceDays;
    student.extracurricular_activities = createStudentDto.extracurricularActivities;
    student.weekly_self_study_hours = createStudentDto.weeklySelfStudyHours;
    student.career_aspiration = createStudentDto.careerAspiration;
    student.math_score = createStudentDto.mathScore;
    student.history_score = createStudentDto.historyScore;
    student.physics_score = createStudentDto.physicsScore;
    student.chemistry_score = createStudentDto.chemistryScore;
    student.biology_score = createStudentDto.biologyScore;
    student.english_score = createStudentDto.englishScore;
    student.geography_score = createStudentDto.geographyScore;
    return this.studentRepository.save(student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<UpdateResult> {
    const student = await this.studentRepository.findOne({ where: { student_id: id } });
    if (!student) {
      throw new NotFoundException({ message: ERROR_MESSAGES.VALIDATION_EXIT_CODE[3006] });
    }
    Object.assign(student, updateStudentDto);
    return this.studentRepository.update(id, student);
  }

  async findById(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { student_id: id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async findByName(name: string, page: number, limit: number): Promise<Student[]> {
    const offset = page * limit;
    return this.studentRepository.find({
      where: [
        { first_name: Like(`%${name}%`) },
        { last_name: Like(`%${name}%`) },
      ],
      skip: offset,
      take: limit,
    });
  }

  async remove(id: number): Promise<void> {
    const student = await this.studentRepository.findOne({ where: { student_id: id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    await this.studentRepository.delete(id);
  }

  async importStudentsFromExcel(buffer: Buffer): Promise<void> {
    if (!buffer) {
      console.error('Buffer is missing at the start of the function.');
      throw new BadRequestException({ message: ERROR_MESSAGES.FILE_EXIT_CODE[5012] });
    }
  
    try {
      console.log('Reading workbook from buffer...');
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      console.log('Workbook read successfully.');
      
      const sheetName = workbook.SheetNames[0];
      console.log(`Sheet name: ${sheetName}`);
      
      const sheet = workbook.Sheets[sheetName];
      console.log('Sheet read successfully.');
  
      const rows = xlsx.utils.sheet_to_json(sheet);
      console.log('Rows converted from sheet:', rows);
  
      for (const row of rows) {
        try {
          console.log('Processing row:', row);
          
          if (!row['first_name'] || !row['last_name'] || !row['email']) {
            console.log(`Missing required fields in row: ${JSON.stringify(row)}`);
            throw new BadRequestException(ERROR_MESSAGES.VALIDATION_EXIT_CODE[3001]);
          }
  
          const student = new Student();
          student.first_name = row['first_name'];
          student.last_name = row['last_name'];
          student.email = row['email']?.trim();
          student.gender = row['gender'];
          student.part_time_job = row['part_time_job'];
          student.absence_days = row['absence_days'];
          student.extracurricular_activities = row['extracurricular_activities'];
          student.weekly_self_study_hours = row['weekly_self_study_hours'];
          student.career_aspiration = row['career_aspiration'];
          student.math_score = row['math_score'];
          student.history_score = row['history_score'];
          student.physics_score = row['physics_score'];
          student.chemistry_score = row['chemistry_score'];
          student.biology_score = row['biology_score'];
          student.english_score = row['english_score'];
          student.geography_score = row['geography_score'];
  
          console.log('Saving student:', student);
          await this.studentRepository.save(student);
          console.log('Student saved successfully:', student);
  
        } catch (error) {
          console.error(`Error processing row: ${JSON.stringify(row)} - ${error.message}`);
          if (error.code === '23505') {
            throw new BadRequestException(ERROR_MESSAGES.DATABASE_EXIT_CODE[4006]);
          }
          throw new InternalServerErrorException(ERROR_MESSAGES.UNKNOW_EXIT_CODE[9001]);
        }
      }
    } catch (error) {
      console.error(`Error reading workbook: ${error.message}`);
      throw new InternalServerErrorException(ERROR_MESSAGES.SERVER_EXIT_CODE[6001]);
    }
  }  
}