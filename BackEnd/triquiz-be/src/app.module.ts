import { Module } from '@nestjs/common';
import { QuizController } from './quiz/quiz.controller';

@Module({ // NOTE: decorator
  imports: [],
  controllers: [QuizController],
  providers: [],
})
export class AppModule {} // NOTE: root module. 단 하나만 존재하는 module
