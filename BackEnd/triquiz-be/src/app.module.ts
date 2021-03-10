import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // NOTE: ORM(Object Relational Mapper)
import { Quiz } from './quiz/entities/quiz.entities';
import { QuizModule } from './quiz/quiz.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), { autoLoadEntities: true }),
    }),
    QuizModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
