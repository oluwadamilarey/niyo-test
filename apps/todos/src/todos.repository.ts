import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, FilterQuery } from 'mongoose';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodosRepository extends AbstractRepository<Todo> {
  protected readonly logger = new Logger(TodosRepository.name);

  constructor(
    @InjectModel(Todo.name) todoModel: Model<Todo>,
    @InjectConnection() connection: Connection,
  ) {
    super(todoModel, connection);
  }

  async findOneAndDelete(
    filter: FilterQuery<Todo>,
    options?: any,
  ): Promise<Todo> {
    return this.model.findOneAndDelete(filter, options).exec();
  }
}
