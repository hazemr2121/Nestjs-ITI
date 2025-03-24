import { Injectable, NotFoundException } from '@nestjs/common';
export interface Employee {
  Id: number;
  Name: string;
  Age: string;
  Salary: number;
}

const employees: Employee[] = [
  {
    Id: 1,
    Name: 'Hazem',
    Age: '30',
    Salary: 50000,
  },
  {
    Id: 2,
    Name: 'Omar',
    Age: '25',
    Salary: 40000,
  },
  {
    Id: 3,
    Name: 'Abdo',
    Age: '35',
    Salary: 60000,
  },
  {
    Id: 4,
    Name: 'Nour',
    Age: '40',
    Salary: 70000,
  },
  {
    Id: 5,
    Name: 'Salma',
    Age: '45',
    Salary: 80000,
  },
];

@Injectable()
export class EmployeeService {
  getEmployees() {
    return employees;
  }

  getEmployeeById(id: number) {
    return employees.find((employee) => employee.Id === id);
  }

  addEmployee(employee: Employee) {
    employee.Id = employees[employees.length - 1].Id + 1;

    employees.push(employee);
    return employees;
  }

  updateEmployee(id: number, employee: Employee) {
    const index = employees.findIndex((e) => e.Id === id);
    if (index === -1) {
      throw new NotFoundException("employee not found");
    }
    if (index !== -1) {
      employees[index] = { ...employees[index], ...employee };
    }
    return employees;
  }

  deleteEmployee(id: number) {
    const index = employees.findIndex((e) => e.Id === id);
    employees.splice(index, 1);
    return employees;
  }
  getHighestPaidEmployee() {
    return employees.reduce((prev, current) => {
      return prev.Salary > current.Salary ? prev : current;
    });
  }
}
