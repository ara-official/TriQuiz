import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'; // NOTE: [참고] https://github.com/typestack/class-validator

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

export class QuestionItemDto {
  @IsNumber()
  readonly sequence: number;
  @IsString()
  readonly text: string;
  @IsOptional()
  @IsString()
  readonly image: string;
}

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
