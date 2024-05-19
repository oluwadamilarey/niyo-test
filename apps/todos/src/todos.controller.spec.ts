import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoRequest } from './dto/create-todo.request';
import { UpdateTodoRequest } from './dto/update-todo.request';
import { TodoResponse } from './dto/todo.response';

//TODO: Add more test cases for other methods (getTodos, getTodoById, updateTodo, deleteTodo)

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            createTodo: jest.fn(),
            getTodos: jest.fn(),
            getTodoById: jest.fn(),
            updateTodo: jest.fn(),
            deleteTodo: jest.fn(),
          },
        },
      ],
    }).compile();

    todosController = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const createTodoRequest: CreateTodoRequest = {
        title: 'Buy Ps5',
        expiryDate: new Date(2023, 5, 1),
      };
      const userId = '1234';
      const todoResponse: TodoResponse = {
        id: '1',
        title: 'Buy Ps5',
        completed: false,
        expiryDate: new Date(2023, 5, 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await todosController.createTodo(createTodoRequest, {
        user: { id: userId },
      });

      expect(todosService.createTodo).toHaveBeenCalledWith(
        createTodoRequest,
        userId,
      );
      expect(result).toEqual(todoResponse);
    });
  });
});
