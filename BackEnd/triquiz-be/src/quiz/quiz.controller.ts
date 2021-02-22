import { Controller, Get, Post, Delete, Param, Patch } from '@nestjs/common';

@Controller('quiz')
export class QuizController {

    @Get()
    getAll(){
        return 'This will return all quizzes';
    }

    @Get('/:id')
    getOne(@Param('id') quizId: string){
        return `This will return one quiz with the id: ${quizId}`;
    }

    @Post()
    create(){
        return 'This will create a quiz';
    }

    @Delete('/:id')
    remove(@Param('id') quizId: string){
        return `This will delete a quiz with the id: ${quizId}`;
    }

    @Patch('/:id') // NOTE: Patch 는 일부만 수정할 때 사용. 참고로 Put 은 전체를 수정할 때 사용된다고 한다.
    update(@Param('id') quizId: string){
        return `This will patch a quiz with the id: ${quizId}`;
    }
}