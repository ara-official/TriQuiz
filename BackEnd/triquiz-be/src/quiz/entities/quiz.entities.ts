// docs.nestjs.com/techniques/database
// https://typeorm.io/#/entities

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Question } from './question.entities';

@Entity()
export class Quiz {
  // @PrimaryGeneratedColumn({ name: 'quizId' })
  @PrimaryGeneratedColumn()
  quizId: number;
  @Column({ length: 100 })
  title: string;
  @Column({ length: 3000 })
  description: string;
  @Column({ length: 1000 })
  thumbnailImage: string;
  @Column({ default: false })
  private: boolean;
  @Column({ length: 100 })
  authorId: string;
  @Column({ length: 100 })
  password: string;
  @Column({ default: 0 })
  participation: number;
  @CreateDateColumn()
  createDatetime: Date;
  @CreateDateColumn()
  updateDatetime: Date;
  @OneToMany((type) => Question, (question) => question.questionId)
  questions: Question[];
}

// export class Quiz {
//   id: number;
//   title: string;
//   description: string;
//   thumbnailImage: string;
//   private: boolean;
//   authorId: string;
//   password: string;
//   questions: [Question];
// }

// class Question {
//   title: string;
//   hint: string;
//   type: string;
//   image: string;
//   answer: string;
//   questionItems: [QuestionItem];
// }
// class QuestionItem {
//   sequence: number;
//   text: string;
//   image: string;
// }
