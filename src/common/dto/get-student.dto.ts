import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class GetStudentDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  page: number = 0;

  @IsOptional()
  @IsInt()
  @IsPositive()
  limit: number = 10;
}
