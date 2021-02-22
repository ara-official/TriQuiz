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
import { Quiz } from './entities/quiz.entities'

@Controller('quiz')
export class QuizController {
  constructor(readonly quizService: QuizService) {} // NOTE: service 에 접근하기 위해서 생성자에서 요청해야 함.

  @Get()
  getAll(): Quiz[]{
    return this.quizService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') quizId: string): Quiz{
    return this.quizService.getOne(quizId);
  }

  @Post()
  create(@Body() quizData) {
    console.log(quizData);
    return this.quizService.create(quizData);
  }

  @Delete('/:id')
  remove(@Param('id') quizId: string) {
    return this.quizService.delete(quizId);
  }

  @Patch('/:id') // NOTE: Patch 는 일부만 수정할 때 사용. 참고로 Put 은 전체를 수정할 때 사용된다고 한다.
  update(@Param('id') quizId: string, @Body() updateData) {
    return {
      updatedQuiz: quizId,
      ...updateData,
    };
  }
}
