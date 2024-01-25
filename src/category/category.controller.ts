import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { BaseController } from '../base/base.controller';
import {
  ApiBasicAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController extends BaseController<Category> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService);
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('')
  async create(@Body() entity: Category): Promise<number> {
    return this.categoryService.create(entity);
  }
}
