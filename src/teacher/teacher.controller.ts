import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Teacher, TeacherService } from './teacher.service';

@Controller('/teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('/')
  getTeachers() {
    return this.teacherService.getTeachers();
  }
  @Get('/:id')
  getTeacherbyId(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.getTeacherById(id);
  }
  @Post('/')
  addTeacher(@Body() teacher: Teacher) {
    return this.teacherService.addTeacher(teacher);
  }
  @Put('/:id')
  updateTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Body() teacher: Teacher,
  ) {
    return this.teacherService.updateTeacher(id, teacher);
  }
  @Delete('/:id')
  deleteTeacher(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.deleteTeacher(id);
  }
}
