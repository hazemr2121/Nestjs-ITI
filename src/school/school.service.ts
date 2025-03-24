import { Injectable } from '@nestjs/common';
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
  getSchools() {
    return schools;
  }

  getSchoolById(id: number) {
    return schools.find((school) => school.id === id);
  }

  addSchool(school: School) {
    school.id = schools[schools.length - 1].id + 1;

    schools.push(school);
    return schools;
  }

  updateSchool(id: number, school: School) {
    const index = schools.findIndex((s) => s.id === id);
    schools[index] = school;

    return schools;
  }

  deleteSchool(id: number) {
    const index = schools.findIndex((s) => s.id === id);
    schools.splice(index, 1);

    return schools;
  }
}
