import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'; // NOTE: [참고] https://github.com/typestack/class-validator
import { QuestionDto } from './question.dto';

export class CreateQuizDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly thumbnailImage: string;
  @IsBoolean()
  readonly private: boolean;
  @IsString()
  readonly authorId: string;
  @IsString()
  readonly password: string;
  @IsOptional()
  readonly questions: Array<QuestionDto>;
}
