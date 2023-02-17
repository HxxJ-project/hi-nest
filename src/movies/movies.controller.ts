import { DeleteMovieDto } from './dto/delete-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import {
  Controller,
  Delete,
  Get,
  Param,
  Body,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Actor } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') // 기본 url 엔트리 포인트
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  async getAll(): Promise<Actor[]> {
    return await this.moviesService.getAll();
  }

  @Get('search') // @Get(':id') 보다 위에 있어야 작동함
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get(':id')
  async getOne(@Param('id') movieId: number): Promise<Actor> {
    console.log(typeof movieId);

    return await this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  async delete(@Param('id') movieId: number, @Body() data: DeleteMovieDto) {
    return await this.moviesService.deleteOne(movieId, data);
  }

  @Patch(':id')
  async patch(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDto,
  ) {
    return await this.moviesService.update(movieId, updateData);
  }
}
