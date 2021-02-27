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
    return this.quizRepository.find();
  }

  async getOne(quizId: number): Promise<Quiz> {
    let quiz = await this.quizRepository.findOne(quizId);
    if (quiz === undefined) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    let questions = (await this.questionRepository.find()).filter(
      (question) => question.quizId === quizId,
    );
    if (questions === undefined) {
      return quiz;
    }

    let questionItems = (await this.questionItemRepository.find()).filter(
      (questionItem) => questionItem.quizId === quizId,
    );

    if (questionItems !== undefined) {
      for (let i = 0; i < questions.length; i++) {
        let questionItem = questionItems.filter(
          (questionItem) => questionItem.questionId === questions[i].questionId,
        );
        questions[i].questionItems = questionItem;
      }
    }
    quiz.questions = questions;

    return quiz;
  }

  async deleteOne(quizId: number) {
    this.getOne(quizId); // NOTE: Error return

    let questionItems = (await this.questionItemRepository.find()).filter(
      (questionItem) => questionItem.quizId === quizId,
    );
    if (questionItems !== undefined) {
      for (let i = 0; i < questionItems.length; i++) {
        await this.questionItemRepository.delete(
          questionItems[i].questionItemId,
        );
      }
    }

    let questions = (await this.questionRepository.find()).filter(
      (question) => question.quizId === quizId,
    );
    if (questions !== undefined) {
      for (let i = 0; i < questions.length; i++) {
        await this.questionRepository.delete(questions[i].questionId);
      }
    }

    await this.quizRepository.delete(quizId);
  }

  async create(quizData: CreateQuizDto): Promise<Quiz> {
    let quiz = new Quiz();
    quiz.title = quizData.title;
    quiz.description = quizData.description;
    quiz.thumbnailImage = quizData.thumbnailImage;
    quiz.private = quizData.private;
    quiz.authorId = quizData.authorId;
    quiz.password = quizData.password;
    const retQuiz = this.quizRepository.save(quiz);

    if (quizData.questions === undefined) {
      return quiz;
    }

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

      if (quizData.questions[i].questionItems === undefined) {
        quiz.questions.push(qq); // for DBG
        continue;
      }

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

      quiz.questions.push(qq); // for DBG
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
