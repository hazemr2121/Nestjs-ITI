import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Employee, EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  createEmployee(@Body() createEmployeeDto: Employee) {
    return this.employeeService.addEmployee(createEmployeeDto);
  }

  @Get()
  getAllEmployee() {
    return this.employeeService.getEmployees();
  }

  @Get('highest-salary')
  getHiestSalary() {
    return this.employeeService.getHighestPaidEmployee();
  }
  @Get(':id')
  getEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.getEmployeeById(id);
  }

  @Put(':id')
  updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: Employee,
  ) {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.deleteEmployee(id);
  }
}
