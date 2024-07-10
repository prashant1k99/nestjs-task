import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'pass',
  database: 'taskmanagement',
  entities: [Task],
  synchronize: true,
};
