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
  @PrimaryColumn({ type: 'bigint' })
  @Generated('increment')
  attendQuizId: number;
  @Column({ type: 'bigint' })
  quizId: number;
  @CreateDateColumn()
  AttendDateTime: Date;
  @Column()
  questionNumber: string;
  @Column()
  correct: boolean;
}
