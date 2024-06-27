import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class GetTaskFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: string;
}
