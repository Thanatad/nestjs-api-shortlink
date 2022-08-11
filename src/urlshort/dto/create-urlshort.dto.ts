import { IsString, MinLength } from 'class-validator';

export class CreateUrlshortDto {
  @IsString()
  @MinLength(10)
  url: string;

  code: string;
}
