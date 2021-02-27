import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionItem } from './questionItem.entities';
import { Quiz } from './quiz.entities';

@Entity()
export class Question {
  // @PrimaryGeneratedColumn({ name: 'questionId' })
  @PrimaryGeneratedColumn()
  questionId: number;
  @OneToOne((type) => Quiz, (quiz) => quiz.quizId)
  @Column()
  quizId: number;
  @Column()
  title: string;
  @Column()
  hint: string;
  @Column()
  type: string;
  @Column({ default: '' })
  img: string;
  @Column()
  answer: string;
  @CreateDateColumn()
  createDatetime: Date;
  @CreateDateColumn()
  updateDatetime: Date;
  @OneToMany(
    (type) => QuestionItem,
    (questionItem) => questionItem.questionItemId,
  )
  questionItems: QuestionItem[];
}
