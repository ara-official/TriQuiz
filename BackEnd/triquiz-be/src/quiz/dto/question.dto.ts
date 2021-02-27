import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'; // NOTE: [참고] https://github.com/typestack/class-validator
import { QuestionItemDto } from './question-item.dto';

export class QuestionDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly hint: string;
  @IsString()
  readonly type: string;
  @IsOptional()
  @IsString()
  readonly image: string;
  @IsString()
  readonly answer: string;
  @IsOptional()
  readonly questionItems: Array<QuestionItemDto>;
}
