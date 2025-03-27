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
import { SchoolService } from './school.service';
import { School } from './school.service';
import { ApiResponse } from '@nestjs/swagger';
import { GetAllSchoolsResponse } from 'src/utlis/interfaces';

@Controller('/schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get('/')
  @ApiResponse({
    type: GetAllSchoolsResponse,
    isArray: true,
  })
  getSchools() {
    return this.schoolService.getSchools();
  }
  @Get('/analytics')
  getSchoolAnalytics() {
    return this.schoolService.getSchoolAnalytics();
  }

  @Post('/')
  addSchool(@Body() school: GetAllSchoolsResponse) {
    return this.schoolService.addSchool(school);
  }
  @Put('/:id')
  updateSchool(@Param('id', ParseIntPipe) id: number, @Body() school: School) {
    return this.schoolService.updateSchool(id, school);
  }
  @Delete('/:id')
  deleteSchool(@Param('id', ParseIntPipe) id: number) {
    return this.schoolService.deleteSchool(id);
  }

  @Get('/:id')
  getSchoolbyId(@Param('id', ParseIntPipe) id: number) {
    return this.schoolService.getSchoolById(id);
  }
}
