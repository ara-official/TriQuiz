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
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(readonly quizService: QuizService) {} // NOTE: service 에 접근하기 위해서 생성자에 quizService 라는 Property 를 요청?해야 함.

  @Get('')
  getAll(): Promise<Quiz[]> {
    return this.quizService.getAll();
  }

  @Get('list')
  getList(
    @Query('num') num: number,
    @Query('keyword') keyword: string,
    @Query('order') order: string,
  ): Promise<Quiz[]> {
    console.log('[getList]', num, keyword, order);
    return this.quizService.getList(num, keyword, order);
  }

  @Get('list/more')
  getListMore(
    @Query('id') id: number,
    @Query('num') num: number,
    @Query('keyword') keyword: string,
    @Query('order') order: string,
  ): Promise<Quiz[]> {
    console.log('[getListMore]', id, num, keyword, order);
    return this.quizService.getListMore(id, num, keyword, order);
  }

  @Post()
  create(@Body() quizData: CreateQuizDto): Promise<Quiz> {
    return this.quizService.create(quizData);
  }
}
