import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entities';
import { Connection } from 'typeorm';
import { Question } from './entities/question.entities';
import { QuestionItem } from './entities/questionItem.entities';

@Injectable()
export class QuizService {
  // private quizzes: Quiz[] = [];
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(QuestionItem)
    private questionItemRepository: Repository<QuestionItem>,
    private connection: Connection,
  ) {}

  getAll(): Promise<Quiz[]> {
    // return this.quizzes;
    return this.quizRepository.find();
  }

  getOne(quizId: number): Promise<Quiz> {
    // const quiz = this.quizzes.find((quiz) => quiz.id === quizId); // NOTE: find 함수는 특정 조건에 부합하는 배열의 첫 번째 값을 리턴
    // if (!quiz) {
    //   throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    // }
    // return quiz;
    return this.quizRepository.findOne(quizId);
  }

  deleteOne(quizId: number) {
    this.getOne(quizId); // NOTE: Error return
    // this.quizzes = this.quizzes.filter((quiz) => quiz.id !== quizId); // NOTE: filter 함수는 특정 조건에 부합하는 배열의 모든 값을 배열 형태로 리턴
    this.quizRepository.delete(quizId);
  }

  async create(quizData: CreateQuizDto): Promise<Quiz> {
    console.log(quizData);
    // this.quizzes.push({
    //   id: this.quizzes.length + 1,
    //   ...quizData,
    //   // title: quizData.title,
    //   // description: quizData.description,
    //   // thumbnail_image: quizData.thumbnail_image,
    //   // private: quizData.private,
    //   // author_id: quizData.author_id,
    //   // password: quizData.password,
    //   // questions: quizData.questions
    // });
    // this.quizRepository.create(quizData);

    let quiz = new Quiz();
    quiz.title = quizData.title;
    quiz.description = quizData.description;
    quiz.thumbnailImage = quizData.thumbnailImage;
    quiz.private = quizData.private;
    quiz.authorId = quizData.authorId;
    quiz.password = quizData.password;
    const retQuiz = this.quizRepository.save(quiz);
    if (quizData.questions !== undefined) {
      quiz.questions = new Array<Question>();
      for (var i = 0; i < quizData.questions.length; i++) {
        let qq = new Question();
        qq.quizId = (await retQuiz).quizId;
        qq.title = quizData.questions[i].title;
        qq.hint = quizData.questions[i].hint;
        qq.type = quizData.questions[i].type;
        qq.img = quizData.questions[i].image;
        qq.answer = quizData.questions[i].answer;
        const retQuestion = this.questionRepository.save(qq);

        if (quizData.questions[i].questionItems !== undefined) {
          qq.questionItems = Array<QuestionItem>();
          for (var j = 0; j < quizData.questions[i].questionItems.length; j++) {
            const ii = new QuestionItem();
            ii.quizId = (await retQuiz).quizId;
            ii.questionId = (await retQuestion).questionId;
            ii.sequence = quizData.questions[i].questionItems[j].sequence;
            ii.text = quizData.questions[i].questionItems[j].text;
            ii.img = quizData.questions[i].questionItems[j].image;
            qq.questionItems.push(ii); // for DBG
            this.questionItemRepository.save(ii);
          }
        }

        quiz.questions.push(qq); // for DBG
      }
    }

    // return this.quizRepository.create(quiz);
    return quiz;
  }

  update(quizId: number, updateData: UpdateQuizDto) {
    const quiz = this.getOne(quizId);
    console.log(quiz);
    // this.deleteOne(quizId);
    // this.quizzes.push({ ...quiz, ...updateData });
    this.quizRepository.update(quizId, updateData);
  }
}
