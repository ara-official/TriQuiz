import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions, getRepository, Repository } from 'typeorm';
import { Question } from './entities/question.entities';
import { QuestionItem } from './entities/questionItem.entities';
import { Quiz } from './entities/quiz.entities';
import { QuizController } from './quiz.controller';
import { QuizModule } from './quiz.module';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
  // jest.setTimeout(10000);

  // 변수 선언
  let quizController: QuizController;
  let quizService: QuizService;
  let quizRepository: Repository<Quiz>;
  let questionRepository: Repository<Question>;
  let questionItemRepository: Repository<QuestionItem>;

  beforeEach(async () => {
    quizRepository = new Repository();
    questionRepository = new Repository();
    questionItemRepository = new Repository();
    quizService = new QuizService(
      quizRepository,
      questionRepository,
      questionItemRepository,
    );

    quizController = new QuizController(quizService);
  });

  // individual test
  it('should be defined', () => {
    expect(quizRepository).toBeDefined();
    expect(questionRepository).toBeDefined();
    expect(questionItemRepository).toBeDefined();
    expect(quizService).toBeDefined();
  });

  describe('getList', () => {
    it('should return an array of Quiz', async () => {
      const id = 0;
      const num = 0;
      const keyword = '';
      const order = 'create_time';
      const result = await quizRepository.find();
      // const result = ['test'];
      // console.log(await quizController.getList(0, '', 'create_time'));
      // expect(await quizController.getList(0,'', 'create_time'));
    });
  });
});
