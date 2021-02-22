import { Injectable } from '@nestjs/common';
import { Quiz } from './entities/quiz.entities';

@Injectable()
export class QuizService {
  private quizzes: Quiz[] = [];

  getAll(): Quiz[] {
    return this.quizzes;
  }

  getOne(quizId: string): Quiz {
    return this.quizzes.find((quiz) => quiz.id === +quizId);
  }

  delete(quizId: string): boolean {
    this.quizzes.filter((quiz) => quiz.id !== parseInt(quizId));
    return;
  }

  create(quizData) {
    console.log(quizData);
    this.quizzes.push({
      id: quizData.id,
      title: quizData.title,
      description: quizData.description,
      thumbnail_image: quizData.thumbnail_image,
      private: quizData.private,
      author_id: quizData.author_id,
      password: quizData.password,
      questions: quizData.questions
    });
  }
}
