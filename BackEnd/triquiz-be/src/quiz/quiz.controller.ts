import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entities';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(readonly quizService: QuizService) {} // NOTE: service 에 접근하기 위해서 생성자에서 요청해야 함.
  @Post()
  create(@Body() quizData: CreateQuizDto) {
    console.log(quizData);
    return quizData;
  }
}
