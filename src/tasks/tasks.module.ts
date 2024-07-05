import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
// import { Task } from './entities/task.entity';
import { TaskRepository } from './entities/task.repository';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository, Task])], // Ensure Task entity is registered here
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
