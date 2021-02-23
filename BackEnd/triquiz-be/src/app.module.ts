import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateQuizController } from './create-quiz/create-quiz.controller';
import { QuizController } from './quiz/quiz.controller';

@Module({
  imports: [],
  controllers: [AppController, CreateQuizController, QuizController],
  providers: [AppService],
})
export class AppModule {}
