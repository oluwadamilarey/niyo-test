import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoResponse } from './dto/todo.response';
import { UpdateTodoRequest } from './dto/update-todo.request';
import { JwtAuthGuard } from '@app/common';
import { CreateTodoRequest } from './dto/create-todo.request';
import { Todo, TodoSchema } from './schemas/todo.schema';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTodo(
    @Body() createTodoRequest: CreateTodoRequest,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const createdTodo = await this.todosService.createTodo(
      createTodoRequest,
      userId,
    );
    return createdTodo;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoRequest: UpdateTodoRequest,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const updatedTodo = await this.todosService.updateTodo(
      id,
      updateTodoRequest,
      userId,
    );
    return updatedTodo;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTodo(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    await this.todosService.deleteTodo(id, userId);
    return { message: 'Todo deleted successfully' };
  }
}
