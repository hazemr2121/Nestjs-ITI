import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { TeacherService } from 'src/teacher/teacher.service';

export interface School {
  id: number;
  name: string;
  address: string;
  principal: string;
  contact: string;
}

const schools: School[] = [
  {
    id: 1,
    name: 'Cairo International School',
    address: '123 Nile Street, Cairo',
    principal: 'Dr. Hossam Youssef',
    contact: '+20234567890',
  },
  {
    id: 2,
    name: 'Alexandria Modern Academy',
    address: '456 Corniche Road, Alexandria',
    principal: 'Mrs. Mona Said',
    contact: '+20398765432',
  },
];

@Injectable()
export class SchoolService {
  constructor(
    @Inject(forwardRef(() => TeacherService))
    private readonly teacherService: TeacherService,
  ) {}

  getSchools() {
    return schools;
  }

  addSchool(school: School) {
    school.id = schools[schools.length - 1].id + 1;

    schools.push(school);
    return schools;
  }

  updateSchool(id: number, school: School) {
    const index = schools.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundException('School not found');
    }
    schools[index] = school;

    return schools;
  }

  deleteSchool(id: number) {
    const index = schools.findIndex((s) => s.id === id);
    schools.splice(index, 1);

    return schools;
  }

  getSchoolAnalytics() {
    const teacherCounts = schools.map((school) => {
      const teacherCount = this.teacherService
        .getTeachers()
        .filter((teacher) => Number(teacher.schoolId) === school.id).length;
      return { id: school.id, name: school.name, teacherCount };
    });

    const mostTeachers = teacherCounts.reduce((prev, current) =>
      prev.teacherCount > current.teacherCount ? prev : current,
    );

    const leastTeachers = teacherCounts.reduce((prev, current) =>
      prev.teacherCount < current.teacherCount ? prev : current,
    );

    return {
      mostTeachers: {
        id: mostTeachers.id,
        name: mostTeachers.name,
        teacherCount: mostTeachers.teacherCount,
      },
      leastTeachers: {
        id: leastTeachers.id,
        name: leastTeachers.name,
        teacherCount: leastTeachers.teacherCount,
      },
    };
  }
  getSchoolById(id: number) {
    const school = schools.find((school) => school.id === id);
    if (!school) {
      throw new NotFoundException('School not found');
    }
    const teacherCount = this.teacherService
      .getTeachers()
      .filter((teacher) => Number(teacher.schoolId) === school.id).length;

    return { id: school.id, name: school.name, teacherCount };
  }
}
