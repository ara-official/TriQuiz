import { Injectable, NotFoundException } from '@nestjs/common';
import { Quiz } from './entities/quiz.entities';

@Injectable()
export class QuizService {
  private quizzes: Quiz[] = [];

  getAll(): Quiz[] {
    return this.quizzes;
  }

  getOne(quizId: string): Quiz {
    const quiz = this.quizzes.find((quiz) => quiz.id === +quizId); // NOTE: find 함수는 특정 조건에 부합하는 배열의 첫 번째 값을 리턴
    if (!quiz)
    {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }
    return quiz;
  }

  deleteOne(quizId: string) {
    this.getOne(quizId); // NOTE: Error return
    this.quizzes = this.quizzes.filter((quiz) => quiz.id !== parseInt(quizId)); // NOTE: filter 함수는 특정 조건에 부합하는 배열의 모든 값을 배열 형태로 리턴
  }

  create(quizData) {
    console.log(quizData);
    this.quizzes.push({
      id: this.quizzes.length + 1,
      ...quizData
      // title: quizData.title,
      // description: quizData.description,
      // thumbnail_image: quizData.thumbnail_image,
      // private: quizData.private,
      // author_id: quizData.author_id,
      // password: quizData.password,
      // questions: quizData.questions
    });
  }

  update(quizId: string, updateData)
  {
    const quiz = this.getOne(quizId);
    console.log(quiz);
    this.deleteOne(quizId);
    this.quizzes.push({...quiz, ...updateData});
  }
}
