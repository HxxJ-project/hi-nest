import { CreateMovieDto } from './create-movie.dto';
import { PickType } from '@nestjs/mapped-types';

export class DeleteMovieDto extends PickType(CreateMovieDto, [
  'password',
] as const) {}
