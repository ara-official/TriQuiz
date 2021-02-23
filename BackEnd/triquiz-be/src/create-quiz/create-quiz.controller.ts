import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Request } from 'express';
import { sample } from './dto/sample.dto';

@Controller('create-quiz')
export class CreateQuizController {
    @Post()
    async CreateQuiz(@Body() Sample : sample){
        console.log(sample);
        return sample;
    }
}
