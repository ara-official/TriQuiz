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

  @Get()
  getAll(): Promise<Quiz[]> {
    return this.quizService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') quizId: number): Promise<Quiz> {
    // console.log(typeof quizId);
    return this.quizService.getOne(quizId);
  }

  @Post()
  create(@Body() quizData: CreateQuizDto): Promise<Quiz> {
    console.log(quizData);
    return this.quizService.create(quizData);
  }

  @Delete('/:id')
  remove(@Param('id') quizId: number) {
    return this.quizService.deleteOne(quizId);
  }

  @Patch('/:id') // NOTE: Patch 는 일부만 수정할 때 사용. 참고로 Put 은 전체를 수정할 때 사용된다고 한다.
  update(@Param('id') quizId: number, @Body() updateData: UpdateQuizDto) {
    return this.quizService.update(quizId, updateData);
  }
}
