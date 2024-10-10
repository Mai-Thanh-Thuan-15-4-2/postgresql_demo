import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, UpdateResult } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import { CreateStudentDto, UpdateStudentDto } from '../dto/student.dto';
import { ERROR_MESSAGES } from '../constants/enums/error-massage.enum';
import * as ExcelJS from 'exceljs';
import { unlink } from 'fs/promises';
import { Workbook } from 'exceljs';
import { CacheService } from './cache.service';


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    private cacheService: CacheService,
  ) { }

  async findAll({ page, limit }): Promise<StudentEntity[]> {
    const offset = page * limit;
    const cachedStudents = await this.cacheService.get('allStudents');
    if (cachedStudents) {
      return cachedStudents;
    }
    const students = await this.studentRepository.find({
      skip: offset,
      take: limit,
    });
    await this.cacheService.set('allStudents', students, 3600);
    return students;
  }

  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const student = new StudentEntity();
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
    const savedStudent = await this.studentRepository.save(student);
    await this.cacheService.del('allStudents');
    return savedStudent;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    const student = await this.studentRepository.findOne({
      where: { student_id: id },
    });
    if (!student) {
      throw new NotFoundException({
        message: ERROR_MESSAGES.VALIDATION_EXIT_CODE[3006],
      });
    }
    Object.assign(student, updateStudentDto);
    const updatedStudent = await this.studentRepository.update(id, student);
    await this.cacheService.set(`student_${id}`, updatedStudent, 3600);
    await this.cacheService.del('allStudents');
    return updatedStudent;
  }

  async findById(id: number): Promise<StudentEntity> {
    const cachedStudent = await this.cacheService.get(`student_${id}`);
    if (cachedStudent) {
      return cachedStudent;
    }
    const student = await this.studentRepository.findOne({
      where: { student_id: id },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    await this.cacheService.set(`student_${id}`, student, 3600);
    return student;
  }

  async findByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<StudentEntity[]> {
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
    const student = await this.studentRepository.findOne({
      where: { student_id: id },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    await this.studentRepository.delete(id);
    await this.cacheService.del(`student_${id}`);
    await this.cacheService.del('allStudents');
  }
  async importStudentsFromExcel(filePath: string): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(1);
      console.log(`Đọc sheet thành công: ${worksheet.name}`);

      const students = [];
      const emailSet = new Set<string>();

      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) return;

        const email = row.getCell(4).value?.toString();
        if (emailSet.has(email)) {
          console.log(`Duplicate email found: ${email}`);
          return;
        }

        const student = new StudentEntity();
        student.first_name = this.truncateString(row.getCell(2).value?.toString(), 50);
        student.last_name = this.truncateString(row.getCell(3).value?.toString(), 50);
        student.email = this.truncateString(email, 100);
        student.gender = this.truncateString(row.getCell(5).value?.toString(), 10);
        student.part_time_job = row.getCell(6).value === 'true' || row.getCell(6).value === true;
        student.absence_days = Number(row.getCell(7).value) || 0;
        student.extracurricular_activities = row.getCell(8).value === 'true' || row.getCell(8).value === true;
        student.weekly_self_study_hours = Number(row.getCell(9).value) || 0;
        student.career_aspiration = this.truncateString(row.getCell(10).value?.toString(), 100);
        student.math_score = Number(row.getCell(11).value) || 0;
        student.history_score = Number(row.getCell(12).value) || 0;
        student.physics_score = Number(row.getCell(13).value) || 0;
        student.chemistry_score = Number(row.getCell(14).value) || 0;
        student.biology_score = Number(row.getCell(15).value) || 0;
        student.english_score = Number(row.getCell(16).value) || 0;
        student.geography_score = Number(row.getCell(17).value) || 0;

        emailSet.add(email);
        students.push(student);
      });

      await this.studentRepository.save(students);
      console.log('Lưu sinh viên thành công.');
      await unlink(filePath);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw new InternalServerErrorException('Không thể đọc tệp Excel');
    }
  }

  private truncateString(str: string, maxLength: number): string {
    return str?.length > maxLength ? str.substring(0, maxLength) : str;
  }
  async exportStudentsToExcel(jsonData: any[]): Promise<Buffer> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Students');

    worksheet.columns = [
      { header: 'ID', key: 'student_id', width: 10 },
      { header: 'First Name', key: 'first_name', width: 15 },
      { header: 'Last Name', key: 'last_name', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Part Time Job', key: 'part_time_job', width: 20 },
      { header: 'Absence Days', key: 'absence_days', width: 15 },
      { header: 'Extracurricular Activities', key: 'extracurricular_activities', width: 30 },
      { header: 'Weekly Self Study Hours', key: 'weekly_self_study_hours', width: 20 },
      { header: 'Career Aspiration', key: 'career_aspiration', width: 20 },
      { header: 'Math Score', key: 'math_score', width: 10 },
      { header: 'History Score', key: 'history_score', width: 10 },
      { header: 'Physics Score', key: 'physics_score', width: 10 },
      { header: 'Chemistry Score', key: 'chemistry_score', width: 10 },
      { header: 'Biology Score', key: 'biology_score', width: 10 },
      { header: 'English Score', key: 'english_score', width: 10 },
      { header: 'Geography Score', key: 'geography_score', width: 10 },
    ];

    jsonData.forEach(student => {
      worksheet.addRow(student);
    });

    const buffer: Buffer = await workbook.xlsx.writeBuffer() as Buffer;
    return buffer;
  }
}