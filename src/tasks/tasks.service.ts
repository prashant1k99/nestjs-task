import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks = [];

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: this.tasks.length + 1,
      status: TaskStatus.OPEN,
      ...createTaskDto,
    };

    this.tasks.push(task);

    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);

    task.status = updateTaskDto.status as TaskStatus;

    return task;
  }

  remove(id: number): boolean {
    const task = this.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);

    return true;
  }
}
