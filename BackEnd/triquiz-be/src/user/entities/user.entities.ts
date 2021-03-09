import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttendQuiz } from './attendquiz.entities';
import { CreateQuiz } from './createquiz.entities';

@Entity()
export class User {
  // @PrimaryGeneratedColumn({ name: 'questionId' })
  @PrimaryColumn({ type: 'bigint' })
  @Generated('increment')
  userId: number;
  @Column()
  id: string;
  @Column()
  password: string;
  @Column()
  joinMethod: string;
  @Column()
  nickname: string;
  @CreateDateColumn()
  joinDateTime: Date;
  @OneToMany((type) => CreateQuiz, (quiz) => quiz.quizId)
  makeQuizList: Array<CreateQuiz>;
  @OneToMany((type) => AttendQuiz, (quiz) => quiz.quizId)
  attendQuizList: Array<AttendQuiz>;
}
