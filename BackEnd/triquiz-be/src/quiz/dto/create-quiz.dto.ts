import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isValidationOptions,
} from 'class-validator'; // NOTE: [참고] https://github.com/typestack/class-validator

function errorMsg(field: string) {
  return `유효하지 않은 ${field} 입니다.`;
}
export class CreateQuizDto {
  @IsNotEmpty()
  @IsString({ message: errorMsg('title') })
  readonly title: string;
  @IsNotEmpty()
  @IsBoolean({ message: errorMsg('private') })
  readonly private: boolean;
  @IsNotEmpty()
  @IsString({ message: errorMsg('authorId') })
  readonly authorId: string;
  // @IsNotEmpty()
  @IsString({ message: errorMsg('password') })
  readonly password: string;
  // @IsNotEmpty()
  @IsOptional()
  @IsNumber({}, { message: errorMsg('questionNum') })
  readonly questionNum: number;
  // @IsNotEmpty()
  @IsOptional()
  @IsNumber({}, { message: errorMsg('participationNum') })
  readonly participationNum: number;
  // @IsNotEmpty()
  @IsOptional()
  @IsNumber({}, { message: errorMsg('likeNum') })
  readonly likeNum: number;
  @IsString({ message: errorMsg('description') })
  readonly description: string;
  @IsString({ message: errorMsg('thumbnailImage') })
  readonly thumbnailImage: string;
  @IsOptional()
  readonly questions: Array<QuestionDto>;
}

export class QuestionDto {
  // @IsNotEmpty()
  @IsString({ message: errorMsg('title') })
  readonly title: string;
  @IsString({ message: errorMsg('hint') })
  readonly hint: string;
  @IsNotEmpty()
  @IsString({ message: errorMsg('type') })
  readonly type: string;
  @IsString({ message: errorMsg('image') })
  readonly image: string;
  @IsNotEmpty({ message: 'not null' })
  @IsString({ message: errorMsg('answer') })
  readonly answer: string;
  @IsOptional()
  readonly questionItems: Array<QuestionItemDto>;
}

export class QuestionItemDto {
  @IsNotEmpty()
  @IsNumber({}, { message: errorMsg('sequence') })
  readonly sequence: number;
  @IsNotEmpty()
  @IsString({ message: errorMsg('text') })
  readonly text: string;
  @IsString({ message: errorMsg('image') })
  readonly image: string;
}
