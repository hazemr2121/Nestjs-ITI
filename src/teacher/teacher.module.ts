import { Module, forwardRef } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { SchoolModule } from '../school/school.module';

@Module({
  imports: [forwardRef(() => SchoolModule)], 
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService], 
})
export class TeacherModule {}
