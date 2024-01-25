import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { BaseController } from '../base/base.controller';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Roles } from '../core/decorators/roles.decorator';
import { UserTypeEnum } from '../utils/enums/user-type.enum';
import { ResponseMessage } from '../core/decorators/response.decorator';
import { TokenGuard } from 'src/authentication/http/guards/token.guard';
import { Role } from '../utils/enums/user.enum';
import { RolesGuard } from '../authentication/http/guards/roles.guard';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth()
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
  @ResponseMessage('Record has been successfully created')
  @Roles(Role.ADMIN)
  @UseGuards(TokenGuard, RolesGuard)
  async create(@Body() entity, @Req() req: any): Promise<number> {
    console.log(req.user);
    return this.categoryService.create({
      ...entity,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });
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
  @Roles(Role.ADMIN)
  @UseGuards(TokenGuard, RolesGuard)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Put('/:id')
  @ResponseMessage('Record has been successfully updated')
  async update(@Param('id') id: number, @Body() entity, @Req() req: any) {
    return this.categoryService.update({
      ...entity,
      id: +id,
      updatedBy: req.user.id,
    });
  }
}
