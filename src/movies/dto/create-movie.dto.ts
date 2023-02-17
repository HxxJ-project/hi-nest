import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly age: number;
  @IsString()
  readonly password: string;
}
