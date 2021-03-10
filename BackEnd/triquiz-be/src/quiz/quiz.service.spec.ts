import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Question } from './entities/question.entities';
import { QuestionItem } from './entities/questionItem.entities';
import { Quiz } from './entities/quiz.entities';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
  // jest.setTimeout(10000);

  let service: QuizService;
  let quizRepository: Repository<Quiz>;
  let questionRepository: Repository<Question>;
  let questionItemRepository: Repository<QuestionItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'nodejs',
          password: '111111',
          database: 'opentutorials',
          entities: [Quiz, Question, QuestionItem],
          synchronize: true, // NOTE: test 시에는 true 로 사용. 실제 제품에서는 false 로 setting
          autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature([Quiz, Question, QuestionItem]),
      ],
      controllers: [QuizController],
      providers: [QuizService],
      exports: [TypeOrmModule],
    }).compile();

    // service = module.get<QuizService>(QuizService);
    quizRepository = module.get<Repository<Quiz>>(getRepositoryToken(Quiz));
    questionRepository = module.get<Repository<Question>>(
      getRepositoryToken(Question),
    );
    questionItemRepository = module.get<Repository<QuestionItem>>(
      getRepositoryToken(QuestionItem),
    );
    service = new QuizService(
      quizRepository,
      questionRepository,
      questionItemRepository,
    );
  });

  // individual test
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return the Array', async () => {
      const quizzes = await service.getAll();
      expect(quizzes).toBeInstanceOf(Array);
    });
  });
});
