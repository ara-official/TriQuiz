import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  isValidationOptions,
} from 'class-validator'; // NOTE: [참고] https://github.com/typestack/class-validator

function errorMsg(field: string) {
  return `유효하지 않은 ${field} 입니다.`;
}
export class CreateQuizDto {
  @IsString({ message: errorMsg('title') })
  readonly title: string;
  @IsString({ message: errorMsg('description') })
  readonly description: string;
  @IsString({ message: errorMsg('thumbnailImage') })
  readonly thumbnailImage: string;
  @IsBoolean({ message: errorMsg('private') })
  readonly private: boolean;
  @IsString({ message: errorMsg('authorId') })
  readonly authorId: string;
  @IsString({ message: errorMsg('password') })
  readonly password: string;

  @IsNumber({}, { message: errorMsg('questionNum') })
  readonly questionNum: number;
  @IsNumber({}, { message: errorMsg('participationNum') })
  readonly participationNum: number;
  @IsNumber({}, { message: errorMsg('likeNum') })
  readonly likeNum: number;
  @IsOptional()
  readonly questions: Array<QuestionDto>;
}

export class QuestionDto {
  @IsString({ message: errorMsg('title') })
  readonly title: string;
  @IsString({ message: errorMsg('hint') })
  readonly hint: string;
  @IsString({ message: errorMsg('type') })
  readonly type: string;
  @IsOptional()
  @IsString({ message: errorMsg('image') })
  readonly image: string;
  @IsString({ message: errorMsg('answer') })
  readonly answer: string;
  @IsOptional()
  readonly questionItems: Array<QuestionItemDto>;
}

export class QuestionItemDto {
  @IsNumber({}, { message: errorMsg('sequence') })
  readonly sequence: number;
  @IsString({ message: errorMsg('text') })
  readonly text: string;
  @IsOptional()
  @IsString({ message: errorMsg('image') })
  readonly image: string;
}
