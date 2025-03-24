import { Injectable } from '@nestjs/common';
export interface Teacher {
  id: number;
  name: string;
  subject: string;
  experience: number;
  schoolId: number;
  email: string;
  phone: string;
}

@Injectable()
export class TeacherService {
  private readonly teachers: Teacher[] = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      subject: 'Mathematics',
      experience: 10,
      schoolId: 1,
      email: 'ahmed.hassan@example.com',
      phone: '+201234567890',
    },
    {
      id: 2,
      name: 'Sara Ali',
      subject: 'Physics',
      experience: 7,
      schoolId: 2,
      email: 'sara.ali@example.com',
      phone: '+201098765432',
    },
    {
      id: 3,
      name: 'Mohamed Khaled',
      subject: 'English',
      experience: 5,
      schoolId: 1,
      email: 'mohamed.khaled@example.com',
      phone: '+201112223344',
    },
  ];

  getTeachers() {
    return this.teachers;
  }

  getTeacherById(id: number) {
    return this.teachers.find((teacher) => teacher.id === id);
  }

  addTeacher(teacher: Teacher) {
    teacher.id = this.teachers[this.teachers.length - 1].id + 1;
    this.teachers.push(teacher);
    return this.teachers;
  }

  updateTeacher(id: number, teacher: Teacher) {
    const index = this.teachers.findIndex((t) => t.id === id);
    this.teachers[index] = teacher;
    return this.teachers;
  }

  deleteTeacher(id: number) {
    const index = this.teachers.findIndex((t) => t.id === id);
    this.teachers.splice(index, 1);
    return this.teachers;
  }
  
}
