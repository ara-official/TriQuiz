import { Module } from '@nestjs/common';
import { QuizController } from './quiz/quiz.controller';
import { QuizService } from './quiz/quiz.service';

@Module({
  imports: [],
  controllers: [QuizController],
  providers: [QuizService],
})
export class AppModule {
  constructor() {}
}
