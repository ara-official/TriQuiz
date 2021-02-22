import { Test, TestingModule } from '@nestjs/testing';
import { CreateQuizController } from './create-quiz.controller';

describe('CreateQuizController', () => {
  let controller: CreateQuizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateQuizController],
    }).compile();

    controller = module.get<CreateQuizController>(CreateQuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
