import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class ExportStudentDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsInt()
  @Min(0)
  readonly page: number;

  @IsInt()
  @Min(1)
  readonly limit: number;
}
