import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // NOTE: ORM(Object Relational Mapper)
import { Connection } from 'typeorm';
import { Quiz } from './quiz/entities/quiz.entities';
import { QuizModule } from './quiz/quiz.module';
import { AppController } from './app.controller';

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
      entities: [Quiz],
      synchronize: true, // NOTE: test 시에는 true 로 사용. 실제 제품에서는 false 로 setting
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
} // NOTE: root module. 단 하나만 존재하는 module
