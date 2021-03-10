import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendQuiz } from './entities/attendquiz.entities';
import { CreateQuiz } from './entities/createquiz.entities';
import { User } from './entities/user.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private quizRepository: Repository<User>,
    @InjectRepository(CreateQuiz)
    private questionRepository: Repository<CreateQuiz>,
    @InjectRepository(AttendQuiz)
    private questionItemRepository: Repository<AttendQuiz>, // private connection: Connection,
  ) {}
}
