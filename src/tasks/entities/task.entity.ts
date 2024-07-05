import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('varchar')
  description: string;

  @Column('enum', { enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;
}
