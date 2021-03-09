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
export class CreateQuiz {
  // @PrimaryGeneratedColumn({ name: 'questionId' })
  @Generated('increment')
  crateQuizId: number;
  @Column()
  quizId: string;
  @Column()
  quizPassword: string;
}
