import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService], // NOTE: QuizController 에 QuizService 를 Injection 하기 위해서 providers 에 QuizService 를 등록해야함.
})
export class QuizModule {}
