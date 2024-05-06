import { Module } from '@nestjs/common';
import { AppController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { ConfigModule } from '@nestjs/config';
import ExtractToken from 'src/utils/extract.token';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [TaskService, ExtractToken,TaskRepository],
  exports: [TaskService],
})
export class TaskModule {}
