import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // NOTE: ORM(Object Relational Mapper)
import { Quiz } from './quiz/entities/quiz.entities';
import { QuizModule } from './quiz/quiz.module';
import { AppController } from './app.controller';
import { Question } from './quiz/entities/question.entities';
import { QuestionItem } from './quiz/entities/questionItem.entities';

@Module({
  imports: [
    QuizModule,
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {} // NOTE: root module. 단 하나만 존재하는 module
