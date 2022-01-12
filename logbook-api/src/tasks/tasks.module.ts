import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository])
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
