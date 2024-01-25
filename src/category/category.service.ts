import { BadGatewayException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  async delete(id: number) {
    try {
      await this.categoryRepository.softDelete(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
