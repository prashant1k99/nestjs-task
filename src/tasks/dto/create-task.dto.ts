import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @Length(10, 20)
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @Length(0, 200)
  description: string;
}
