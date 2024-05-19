import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateTodoRequest } from './dto/create-todo.request';
import { TodosRepository } from './todos.repository';
import { UpdateTodoRequest } from './dto/update-todo.request';

@Injectable()
export class TodosService {
  constructor(
    private readonly todosRepository: TodosRepository, //@Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy,
  ) {}

  async createTodo(request: CreateTodoRequest, userId: string) {
    const session = await this.todosRepository.startTransaction();
    try {
      const todo = await this.todosRepository.create(
        { ...request, completed: false, userId },
        { session },
      );
      // await lastValueFrom(
      //   this.notificationClient.emit('todo_created', {
      //     request,
      //     userId,
      //   }),
      // );
      await session.commitTransaction();
      return todo;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getTodos(userId: number) {
    return this.todosRepository.find({ userId });
  }

  async getTodoById(id: string, userId: number) {
    return this.todosRepository.findOne({ _id: id, userId });
  }

  async updateTodo(
    id: string,
    updateTodoRequest: UpdateTodoRequest,
    userId: number,
  ) {
    const session = await this.todosRepository.startTransaction();
    try {
      const updatedTodo = await this.todosRepository.findOneAndUpdate(
        { _id: id, userId },
        { ...updateTodoRequest },
      );

      if (!updatedTodo) {
        throw new NotFoundException('Todo not found');
      }

      await session.commitTransaction();
      return updatedTodo;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async deleteTodo(id: string, userId: number) {
    const session = await this.todosRepository.startTransaction();
    try {
      const deletedTodo = await this.todosRepository.findOneAndDelete(
        { _id: id, userId },
        { session },
      );

      if (!deletedTodo) {
        throw new NotFoundException('Todo not found');
      }

      await session.commitTransaction();
      return deletedTodo;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
}
