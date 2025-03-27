import { Module, forwardRef } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [forwardRef(() => TeacherModule)], 
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class SchoolModule {}
