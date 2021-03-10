import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { Question } from './question.entities';
import { Quiz } from './quiz.entities';

@Entity()
export class QuestionItem {
  @PrimaryColumn({ type: 'bigint' })
  @Generated('increment')
  questionItemId: number;
  @OneToOne((type) => Quiz, (quiz) => quiz.quizId)
  @Column({ type: 'bigint' })
  quizId: number;
  @OneToOne((type) => Question, (question) => question.questionId)
  @Column({ type: 'bigint' })
  questionId: number;
  @Column()
  sequence: number;
  @Column()
  text: string;
  @Column({ default: '' })
  image: string;
}
