import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule, AuthModule } from '@app/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';
import { Todo, TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/todos/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    //RmqModule.register({ name: NOTIFICATION_SERVICE }),
    AuthModule,
  ],
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
})
export class TodosModule {}
