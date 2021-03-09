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
  @PrimaryColumn({ type: 'bigint' })
  @Generated('increment')
  crateQuizId: number;
  @CreateDateColumn()
  CreateDateTime: Date;
  @Column()
  quizPassword: string;
}
