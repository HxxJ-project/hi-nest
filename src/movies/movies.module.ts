import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
