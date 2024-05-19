import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class UpdateTodoRequest {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsDate()
  @IsOptional()
  expiryDate?: Date;
}
