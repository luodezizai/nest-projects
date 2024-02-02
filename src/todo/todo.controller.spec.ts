import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import * as request from 'supertest';
describe('TodoController', () => {
  let app: INestApplication;
  let todoController : TodoController
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    todoController = moduleFixture.get<TodoController>(TodoController);
  });

  afterEach(async () => {
    await app.close();
  });
  describe('GET /todos', () => {
    it('should return an array of todos', async () => {
      const res = await request(app.getHttpServer()).get('/todos')
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);

    });
  });
})
