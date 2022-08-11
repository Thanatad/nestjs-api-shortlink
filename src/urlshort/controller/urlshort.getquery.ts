import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GetUrlshortQuery {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @MinLength(10)
  @IsOptional()
  url?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  code?: string;
}
