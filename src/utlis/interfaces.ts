/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class TeachersRequest {
  @ApiProperty({
    example: 'Ahmed Hassan',
  })
  @MinLength(3, {
    message: 'Teacher name is too short',
  })
  @IsNotEmpty({ message: 'Teacher name is required' })
  name: string;
  @ApiProperty({
    example: 'Mathematics',
  })
  @MinLength(3, {
    message: 'Subject name is too short',
  })
  subject: string;
  @ApiProperty({
    example: 10,
  })
  experience: number;
  @ApiProperty({
    example: 1,
  })
  schoolId: number;
  @ApiProperty({
    example: 'hossam.gmail.com',
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  @ApiProperty({
    example: '+201234567890',
    description: 'Phone number of the teacher it can start with +20 or 0020',
  })
  phone: string;
}
export class GetAllTeachersResponse extends TeachersRequest {
  @ApiProperty({
    example: 1,
  })
  id: number;
}

export class SchoolsRequest {
  @ApiProperty({
    example: 'Gamal Abd AL-Nasser',
  })
  @MinLength(3, {
    message: 'School name is too short',
  })
  @IsNotEmpty({ message: 'School name is required' })
  name: string;
  @ApiProperty({
    example: 'Fayoum',
  })
  address: string;
  @ApiProperty({
    example: '+201234567890',
    description: 'Phone number of the school it can start with +20 or 0020',
  })
  contact: string;
  @ApiProperty({
    example: 'Ahmed',
  })
  principal: string;
}

export class GetAllSchoolsResponse extends SchoolsRequest {
  @ApiProperty({
    example: 1,
  })
  id: number;
}
