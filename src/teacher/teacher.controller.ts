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
import { signInDto, SignUpDto } from 'src/utlis/interfaces';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('/')
  @ApiBearerAuth()
  getTeachers() {
    return this.teacherService.getTeachers();
  }
  @Get('/:id')
  @ApiBearerAuth()
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
  @Post('/signup')
  signup(@Body() teacher: SignUpDto) {
    return this.teacherService.signUp(teacher);
  }

  @Post('/signin')
  signin(@Body() credentials: signInDto) {
    return this.teacherService.signin(credentials);
  }

  // @Post('/signin')
  // signin(@Body() credentials: { email: string; password: string }) {
  //   return this.teacherService.signin(credentials);
  // }
}
