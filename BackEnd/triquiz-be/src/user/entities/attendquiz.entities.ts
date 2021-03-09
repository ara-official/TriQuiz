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

@Entity()
export class AttendQuiz {
  // @PrimaryGeneratedColumn({ name: 'questionId' })
  @Generated('increment')
  attendQuizId: number;
  @Column()
  quizId: string;
  @CreateDateColumn()
  AttendDateTime: Date;
  @Column()
  questionNumber: string;
  @Column()
  correct: boolean;
}
