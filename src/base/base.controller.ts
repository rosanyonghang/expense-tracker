import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CoreEntity } from './entities/base.entity';
import { TokenGuard } from 'src/authentication/http/guards/token.guard';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { IBaseService } from './IBaseService.service';

export class BaseController<T extends CoreEntity> {
  private dtoClass: any;
  constructor(private readonly IBaseService: IBaseService<T>) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<T[]> {
    return this.IBaseService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async findById(@Param('id') id: number): Promise<T> {
    return this.IBaseService.get(id);
  }

  @Post()
  @UseGuards(TokenGuard)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() entity: T, @Req() req: any): Promise<number> {
    return this.IBaseService.create(entity);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async delete(@Param('id') id: number) {
    this.IBaseService.delete(id);
  }

  @Put(':id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
  async update(
    @Param('id') id: number,
    @Body() entity: T,
    @Req() req: any,
  ): Promise<T> {
    return this.IBaseService.update({
      id: +id,
      ...entity,
    });
  }
}
