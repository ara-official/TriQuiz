import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateQuizDto,
  QuestionDto,
  QuestionItemDto,
} from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Quiz } from './entities/quiz.entities';
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
    private questionItemRepository: Repository<QuestionItem>, // private connection: Connection,
  ) {}

  // NOTE: DTO 에서 validation check 가 안되는 경우(null check)가 있어서, 아래 check 함수 3종을 추가했음.
  checkValidQuizData(quizData: CreateQuizDto) {
    if (
      quizData.title === null ||
      quizData.thumbnailImage === null ||
      quizData.private === null ||
      quizData.password === null ||
      quizData.description === null ||
      quizData.authorId === null
    ) {
      throw new NotFoundException(`quiz 의 멤버변수는 null 이 될 수 없습니다.`);
    }
    if (
      typeof quizData.title !== 'string' ||
      typeof quizData.thumbnailImage !== 'string' ||
      typeof quizData.private !== 'boolean' ||
      typeof quizData.password !== 'string' ||
      typeof quizData.description !== 'string' ||
      typeof quizData.authorId !== 'string'
    ) {
      throw new NotFoundException(`quiz 의 멤버변수는 null 이 될 수 없습니다.`);
    }
    if (quizData.questions === undefined) {
      throw new NotFoundException(`Question not found`);
    }
    for (var i = 0; i < quizData.questions.length; i++) {
      this.checkValidQuestionData(quizData.questions[i]);
      if (quizData.questions[i].questionItems === undefined) {
        continue;
      }
      for (var j = 0; j < quizData.questions[i].questionItems.length; j++) {
        this.checkValidQuestionItemData(quizData.questions[i].questionItems[j]);
      }
    }
  }
  checkValidQuestionData(questionData: QuestionDto) {
    console.log(questionData);
    if (
      questionData.title === null ||
      questionData.hint === null ||
      questionData.type === null ||
      questionData.image === null ||
      questionData.answer === null
    ) {
      throw new NotFoundException(
        `Question 의 멤버 변수는 null 이 될 수 없습니다.`,
      );
    }
    if (
      typeof questionData.title !== 'string' ||
      typeof questionData.hint !== 'string' ||
      typeof questionData.type !== 'string' ||
      typeof questionData.image !== 'string' ||
      typeof questionData.answer !== 'string'
    ) {
      throw new NotFoundException(
        `Question 의 멤버 변수는 null 이 될 수 없습니다.`,
      );
    }
  }
  checkValidQuestionItemData(questionItemData: QuestionItemDto) {
    if (
      questionItemData.text === null ||
      questionItemData.sequence === null ||
      questionItemData.image === null
    ) {
      throw new NotFoundException(
        `QuestionItem 의 멤버 변수는 null 이 될 수 없습니다.`,
      );
    }
    if (
      typeof questionItemData.text !== 'string' ||
      typeof questionItemData.sequence !== 'number' ||
      typeof questionItemData.image !== 'string'
    ) {
      throw new NotFoundException(
        `QuestionItem 의 멤버 변수의 type 이 잘 못 되었습니다.`,
      );
    }
  }

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
    await this.getOne(quizId); // NOTE: Error return

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
    this.checkValidQuizData(quizData);

    const quiz = new Quiz();
    quiz.title = quizData.title;
    quiz.description = quizData.description;
    quiz.thumbnailImage = quizData.thumbnailImage;
    quiz.private = quizData.private;
    quiz.authorId = quizData.authorId;
    quiz.password = quizData.password;
    const retQuiz = await this.quizRepository.save(quiz);

    if (quizData.questions === undefined) {
      return quiz;
    }

    quiz.questions = new Array<Question>();
    for (var i = 0; i < quizData.questions.length; i++) {
      const question = new Question();
      question.quizId = retQuiz.quizId;
      question.title = quizData.questions[i].title;
      question.hint = quizData.questions[i].hint;
      question.type = quizData.questions[i].type;
      question.image = quizData.questions[i].image;
      question.answer = quizData.questions[i].answer;
      const retQuestion = await this.questionRepository.save(question);

      if (quizData.questions[i].questionItems === undefined) {
        quiz.questions.push(question); // for DBG
        continue;
      }
      question.questionItems = Array<QuestionItem>();
      for (var j = 0; j < quizData.questions[i].questionItems.length; j++) {
        const questionItem = new QuestionItem();
        questionItem.quizId = retQuiz.quizId;
        questionItem.questionId = retQuestion.questionId;
        questionItem.sequence = quizData.questions[i].questionItems[j].sequence;
        questionItem.text = quizData.questions[i].questionItems[j].text;
        questionItem.image = quizData.questions[i].questionItems[j].image;
        question.questionItems.push(questionItem); // for DBG
        this.questionItemRepository.save(questionItem);
      }

      quiz.questions.push(question); // for DBG
    }

    console.log(quiz);
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
