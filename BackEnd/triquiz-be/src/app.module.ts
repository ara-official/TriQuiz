import { Module } from '@nestjs/common';
import { QuizController } from './quiz/quiz.controller';
import { QuizService } from './quiz/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Quiz } from './quiz/entities/quiz.entities';

@Module({ // NOTE: decorator
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nodejs',
      password: '111111',
      database: 'opentutorials',
      entities: [Quiz],
      synchronize: true, // NOTE: test 시에는 true 로 사용. 실제 제품에서는 false 로 setting
    })
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class AppModule {
  constructor(private connection: Connection) {}
} // NOTE: root module. 단 하나만 존재하는 module
