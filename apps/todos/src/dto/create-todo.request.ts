import { IsString, IsOptional, IsDate, IsNotEmpty } from 'class-validator';

export class CreateTodoRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsDate()
  expiryDate?: Date;
}
