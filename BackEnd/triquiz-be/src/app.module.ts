import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // NOTE: ORM(Object Relational Mapper)
import { Quiz } from './quiz/entities/quiz.entities';
import { QuizModule } from './quiz/quiz.module';
import { AppController } from './app.controller';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), { autoLoadEntities: true }),
    }),
    QuizModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {} // NOTE: root module. 단 하나만 존재하는 module
