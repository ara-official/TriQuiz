import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateQuizDto,
  QuestionDto,
  QuestionItemDto,
} from './dto/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  // NOTE: DTO_A 내에 DTO_B 가 있을 경우에, DTO_B 가 정상적으로 동작하지 못합니다. 때문에 유효성 검사하는 code 를 추가했습니다.
  checkValidQuizData(quizData: CreateQuizDto) {
    if (quizData.questions === undefined) {
      throw new NotFoundException(`Question 을 추가해주세요.`);
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
        `Question 의 멤버 변수 type 이 잘못 되었습니다.`,
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
      isNaN(questionItemData.sequence) === true ||
      typeof questionItemData.image !== 'string'
    ) {
      throw new NotFoundException(
        `QuestionItem 의 멤버 변수 type 이 잘못 되었습니다.`,
      );
    }
  }

  checkValidListQuery(num: number, keyword: string, order: string) {
    if (
      typeof num !== 'number' ||
      isNaN(num) === true ||
      typeof keyword !== 'string' ||
      typeof order !== 'string'
    ) {
      throw new NotFoundException(
        `Query String 을 확인해주세요. num: ${num}, keyword:${keyword}, order:${order}`,
      );
    }

    order = order.replace(/\"/g, '').replace(/\'/g, '');

    let bValid = false;
    const validQueryOrder = [
      `create_time`,
      `like_num`,
      `question_num`,
      `participation_num`,
    ];
    validQueryOrder.forEach((element) => {
      if (element === order) {
        bValid = true;
      }
    });
    if (bValid === false) {
      throw new NotFoundException(
        `Query String 을 확인해주세요. 유효하지 않은 order: ${order}. (order 는 ${validQueryOrder} 만 유효합니다)`,
      );
    }
  }

  async getList(num: number, keyword: string, order: string): Promise<Quiz[]> {
    order = order.replace(/\"/g, '').replace(/\'/g, '');
    keyword = keyword.replace(/\"/g, '').replace(/\'/g, '');
    this.checkValidListQuery(num, keyword, order);

    let searchKeyword = '%' + keyword + '%';
    let retQuery = this.quizRepository
      .createQueryBuilder()
      .where(`quiz.title LIKE '${searchKeyword}'`);

    switch (order) {
      case 'create_time':
        return await retQuery
          .orderBy('quiz.createDateTime', 'DESC')
          .limit(num)
          .getMany();
      case 'like_num':
        return await retQuery
          .orderBy('quiz.likeNum', 'DESC')
          .limit(num)
          .getMany();
      case 'question_num':
        return await retQuery
          .orderBy('quiz.questionNum', 'DESC')
          .limit(num)
          .getMany();
      case 'participation_num':
        return await retQuery
          .orderBy('quiz.participationNum', 'DESC')
          .limit(num)
          .getMany();
      default:
        throw new NotFoundException('Quiz List 를 얻어오는데 실패했습니다.');
    }
  }

  async getListMore(
    id: number,
    num: number,
    keyword: string,
    order: string,
  ): Promise<Quiz[]> {
    if (typeof id !== 'number' || isNaN(id) === true) {
      throw new NotFoundException(`Query String 을 확인해주세요. id: ${id}`);
    }
    order = order.replace(/\"/g, '').replace(/\'/g, '');
    keyword = keyword.replace(/\"/g, '').replace(/\'/g, '');
    this.checkValidListQuery(num, keyword, order);

    let searchKeyword = '%' + keyword + '%';
    let retQuery = this.quizRepository
      .createQueryBuilder()
      .where(`quiz.title LIKE '${searchKeyword}'`);

    switch (order) {
      case 'create_time':
        return await retQuery
          .orderBy('quiz.createDateTime', 'DESC')
          .andWhere(`quiz.quizId < ${id}`)
          .limit(num)
          .getMany();
      case 'like_num':
        return await retQuery
          .orderBy('quiz.likeNum', 'DESC')
          .andWhere(`quiz.quizId < ${id}`)
          .limit(num)
          .getMany();
      case 'question_num':
        return await retQuery
          .orderBy('quiz.questionNum', 'DESC')
          .andWhere(`quiz.quizId < ${id}`)
          .limit(num)
          .getMany();
      case 'participation_num':
        return await retQuery
          .orderBy('quiz.participationNum', 'DESC')
          .andWhere(`quiz.quizId < ${id}`)
          .limit(num)
          .getMany();
      default:
        throw new NotFoundException('Quiz List 를 얻어오는데 실패했습니다.');
    }
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
    quiz.questionNum = quizData.questionNum;
    quiz.participationNum = quizData.participationNum;
    quiz.likeNum = quizData.likeNum;
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
      let retQuestion = await this.questionRepository.save(question);

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

    console.log(quiz); // for DBG
    return quiz;
  }
}
