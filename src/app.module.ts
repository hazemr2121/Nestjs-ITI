import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { SchoolModule } from './school/school.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { IsAuthenticatedMiddleware } from './middlewares/is-authenticated.middleware';
import { TeacherService } from './teacher/teacher.service';

@Module({
  imports: [
    TeacherModule,
    SchoolModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TeacherService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
    consumer
      .apply(IsAuthenticatedMiddleware)
      .forRoutes({ path: '/teachers', method: RequestMethod.GET });
  }
}
