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
function isNotEmptyMsg(field: string) {
  return `${field} 가 잘못되었습니다. (!== '', !== null, !== undefined)`;
}
function definedMsg(field: string) {
  return `${field} 가 잘못되었습니다. (!== undefined, !== null)`;
}
export class CreateQuizDto {
  @IsNotEmpty({ message: isNotEmptyMsg('title') })
  @IsString({ message: errorMsg('title') })
  readonly title: string;
  @IsNotEmpty({ message: isNotEmptyMsg('private') })
  @IsBoolean({ message: errorMsg('private') })
  readonly private: boolean;
  @IsNotEmpty({ message: isNotEmptyMsg('authorId') })
  @IsString({ message: errorMsg('authorId') })
  readonly authorId: string;
  @IsDefined({ message: definedMsg('password') })
  @IsString({ message: errorMsg('password') })
  readonly password: string;
  @IsOptional()
  @IsDefined({ message: definedMsg('questionNum') })
  @IsNumber({}, { message: errorMsg('questionNum') })
  readonly questionNum: number;
  @IsOptional()
  @IsDefined({ message: definedMsg('participationNum') })
  @IsNumber({}, { message: errorMsg('participationNum') })
  readonly participationNum: number;
  @IsOptional()
  @IsDefined({ message: definedMsg('participationNum') })
  @IsNumber({}, { message: errorMsg('likeNum') })
  readonly likeNum: number;
  @IsDefined({ message: definedMsg('description') })
  @IsString({ message: errorMsg('description') })
  readonly description: string;
  @IsDefined({ message: definedMsg('thumbnailImage') })
  @IsString({ message: errorMsg('thumbnailImage') })
  readonly thumbnailImage: string;
  @IsOptional()
  readonly questions: Array<QuestionDto>;
}

export class QuestionDto {
  @IsNotEmpty()
  @IsString({ message: errorMsg('title') })
  readonly title: string;
  @IsDefined()
  @IsString({ message: errorMsg('hint') })
  readonly hint: string;
  @IsNotEmpty()
  @IsString({ message: errorMsg('type') })
  readonly type: string;
  @IsDefined()
  @IsString({ message: errorMsg('image') })
  readonly image: string;
  @IsNotEmpty({})
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
  @IsDefined()
  @IsString({ message: errorMsg('image') })
  readonly image: string;
}
