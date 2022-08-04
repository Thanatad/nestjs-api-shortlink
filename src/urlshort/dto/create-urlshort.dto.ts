import { IsString, MaxLength, MinLength } from "class-validator";


export class CreateUrlshortDto {
    @IsString()
    @MinLength(10)
    url: string

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    code: string

}
