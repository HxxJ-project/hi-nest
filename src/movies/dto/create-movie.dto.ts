import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsOptional() // genres는 옵셔널
  @IsString({ each: true })
  readonly genres: string[];
}
