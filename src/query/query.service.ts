import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from './entities/query.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueryService {
  constructor(
    @InjectRepository(Query)
    private readonly queryRepository: Repository<Query>,
  ) {}

  create(createQueryDto: any) {
    return this.queryRepository.create(createQueryDto);
  }

  findAll() {
    return this.queryRepository.find({});
  }

  findOne(id: number) {
    return this.queryRepository.findOne({ where: { id } });
  }

  update(id: number, updateQueryDto: any) {
    return this.queryRepository.update(
      {
        id,
      },
      { ...updateQueryDto },
    );
  }

  remove(id: number) {
    return this.queryRepository.delete({ id });
  }
}
