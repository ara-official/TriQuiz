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
import { QuestionItem } from './questionItem.entities';
import { Quiz } from './quiz.entities';

@Entity()
export class Question {
  // @PrimaryGeneratedColumn({ name: 'questionId' })
  @PrimaryColumn({ type: 'bigint' })
  @Generated('increment')
  questionId: number;
  @OneToOne((type) => Quiz, (quiz) => quiz.quizId)
  @Column({ type: 'bigint' })
  quizId: number;
  @Column()
  title: string;
  @Column({ default: '' })
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
  questionItems: Array<QuestionItem>;
}
