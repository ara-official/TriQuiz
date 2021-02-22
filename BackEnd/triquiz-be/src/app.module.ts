import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateQuizController } from './create-quiz/create-quiz.controller';

@Module({
  imports: [],
  controllers: [AppController, CreateQuizController],
  providers: [AppService],
})
export class AppModule {}
