import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { SchoolModule } from './school/school.module';

@Module({
  imports: [TeacherModule, SchoolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
