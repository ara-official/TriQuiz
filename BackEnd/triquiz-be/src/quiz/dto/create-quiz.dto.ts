import { IsBoolean, IsNumber, IsString } from 'class-validator';

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
  readonly questions: [QuestionDto];
}

class QuestionDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly hint: string;
  @IsString()
  readonly type: string;
  @IsString()
  readonly image: string;
  @IsString()
  readonly answer: string;
  readonly questionItems: [QuestionItem];
}

class QuestionItem {
  @IsNumber()
  readonly sequence: number;
  @IsString()
  readonly text: string;
  @IsString()
  readonly image: string;
}