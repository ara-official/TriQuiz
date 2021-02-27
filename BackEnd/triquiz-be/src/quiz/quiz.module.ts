import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entities';
import { Question } from './entities/question.entities';
import { QuestionItem } from './entities/questionItem.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, QuestionItem])],
  controllers: [QuizController],
  providers: [QuizService], // NOTE: QuizController 에 QuizService 를 Injection 하기 위해서 providers 에 QuizService 를 등록해야함.
  exports: [TypeOrmModule],
})
export class QuizModule {}
