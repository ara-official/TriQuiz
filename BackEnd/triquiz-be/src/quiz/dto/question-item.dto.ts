import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'; // NOTE: [참고] https://github.com/typestack/class-validator

export class QuestionItemDto {
  @IsNumber()
  readonly sequence: number;
  @IsString()
  readonly text: string;
  @IsOptional()
  @IsString()
  readonly image: string;
}
