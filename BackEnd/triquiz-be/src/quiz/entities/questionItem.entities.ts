import { IsOptional } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entities';
import { Quiz } from './quiz.entities';

@Entity()
export class QuestionItem {
  @PrimaryGeneratedColumn()
  questionItemId: number;
  @OneToOne((type) => Quiz, (quiz) => quiz.quizId)
  @Column()
  quizId: number;
  @OneToOne((type) => Question, (question) => question.questionId)
  @Column()
  questionId: number;
  @Column()
  sequence: number;
  @Column()
  text: string;
  @Column({ default: '' })
  img: string;
}
