import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './entities/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskStatus } from './entities/task-status.enum';
import { Like } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = {
      status: TaskStatus.OPEN,
      ...createTaskDto,
    };
    const savedTask = await this.taskRepository.save(task);
    return savedTask;
  }
  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }
  async findAllWithFilters(filterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const tasks = await this.taskRepository.find({
      where: [
        { status },
        { title: Like(`%${search}%`) },
        { description: Like(`%${search}%`) },
      ],
    });

    return tasks;
  }
  async findOne(id: any): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (updateTaskDto.title) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      task.description = updateTaskDto.description;
    }
    if (updateTaskDto.status) {
      task.status = updateTaskDto.status as TaskStatus;
    }

    await this.taskRepository.update(id, task);

    return task;
  }
  async remove(id: number): Promise<boolean> {
    await this.taskRepository.delete(id);
    return true;
  }
}
