import { DeleteMovieDto } from './dto/delete-movie.dto';
import _ from 'lodash';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Actor } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Actor) private actorRepository: Repository<Actor>,
  ) {}

  async getAll(): Promise<Actor[]> {
    return await this.actorRepository.find({
      where: { deletedAt: null },
      select: ['id', 'name', 'age', 'createdAt'],
    });
  }

  async getOne(id: number): Promise<Actor> {
    const movie = await this.actorRepository.findOne({
      where: { id, deletedAt: null },
      select: ['name', 'age', 'createdAt', 'updatedAt'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  create(movieData: CreateMovieDto) {
    this.actorRepository.insert({
      name: movieData.name,
      age: movieData.age,
      password: movieData.password,
    });
  }

  async update(id: number, updateData: UpdateMovieDto) {
    await this.verifyPassword(id, updateData.password);
    // 들어온값만 수정하고싶으면 if문같은걸 사용해야함
    await this.actorRepository.update(id, {
      name: updateData.name,
      age: updateData.age,
    });
  }

  async deleteOne(id: number, data: DeleteMovieDto) {
    await this.verifyPassword(id, data.password);
    this.actorRepository.softDelete(id);
  }

  private async verifyPassword(id: number, password: string) {
    const actor = await this.actorRepository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });

    // if (_.isNil(actor)) {
    //   throw new NotFoundException('Actor not found. id:' + id);
    // }
    if (actor.password !== password.toString()) {
      throw new UnauthorizedException(`Password is not corrected. id: ${id}`);
    }
  }
}
