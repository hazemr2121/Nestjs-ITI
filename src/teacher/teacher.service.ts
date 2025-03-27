/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { SchoolService } from 'src/school/school.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { signInDto, SignUpDto } from 'src/utlis/interfaces';
import { ConfigService } from '@nestjs/config';
export interface Teacher {
  id: number;
  name: string;
  subject: string;
  experience: number;
  schoolId: number;
  email: string;
  phone: string;
  password?: string;
}

@Injectable()
export class TeacherService {
  constructor(
    @Inject(forwardRef(() => SchoolService)) // Use forwardRef here
    private readonly schoolService: SchoolService,
    private readonly configService: ConfigService,
  ) {}
  private readonly teachers: Teacher[] = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      subject: 'Mathematics',
      experience: 10,
      schoolId: 1,
      email: 'ahmed.hassan@example.com',
      phone: '+201234567890',
      password: bcrypt.hashSync('password123', 10),
    },
    {
      id: 2,
      name: 'Sara Ali',
      subject: 'Physics',
      experience: 7,
      schoolId: 2,
      email: 'sara.ali@example.com',
      phone: '+201098765432',
      password: bcrypt.hashSync('password456', 10),
    },
    {
      id: 3,
      name: 'Mohamed Khaled',
      subject: 'English',
      experience: 5,
      schoolId: 1,
      email: 'mohamed.khaled@example.com',
      phone: '+201112223344',
      password: bcrypt.hashSync('password789', 10),
    },
  ];

  getTeachers() {
    return this.teachers.map((teacher) => ({
      ...teacher,
      schoolId: Number(teacher.schoolId),
    }));
  }

  getTeacherById(id: number) {
    const teacher = this.teachers.find((teacher) => teacher.id === id);
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    const school = this.schoolService.getSchoolById(teacher.schoolId);
    return { ...teacher, school };
  }

  addTeacher(teacher: Teacher) {
    teacher.id = this.teachers[this.teachers.length - 1].id + 1;
    this.teachers.push(teacher);
    return this.teachers;
  }

  updateTeacher(id: number, teacher: Teacher) {
    const index = this.teachers.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException('Teacher not found');
    }
    this.teachers[index] = teacher;
    return this.teachers;
  }

  deleteTeacher(id: number) {
    const index = this.teachers.findIndex((t) => t.id === id);
    this.teachers.splice(index, 1);
    return this.teachers;
  }
  signUp(teacher: SignUpDto) {
    if (this.teachers.find((t) => t.email === teacher.email)) {
      throw new ConflictException('Teacher already exists');
    }
    const hashedPassword = bcrypt.hashSync(teacher.password, 10);
    const newTeacher = {
      ...teacher,
      id: this.teachers[this.teachers.length - 1].id + 1,
      password: hashedPassword,
    };
    this.teachers.push(newTeacher);
    const { password, ...teacherWithoutPassword } = newTeacher;
    return teacherWithoutPassword;
  }
  signin(credentials: signInDto) {
    const teacher = this.teachers.find((t) => t.email === credentials.email);
    if (!teacher) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (
      !teacher.password ||
      !bcrypt.compareSync(credentials.password, teacher.password)
    ) {
      throw new UnauthorizedException('Invalid password');
    }
    // generate token
    const payload = { email: teacher.email, sub: teacher.id };
    const jwtToken = jwt.sign(
      payload,
      // 'secret',
      this.configService.get<string>('JWT_SECERT')!,
    );
    // const { password, ...teacherWithoutPassword } = teacher;
    return { jwtToken: jwtToken };
  }
}
