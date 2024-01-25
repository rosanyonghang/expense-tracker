import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { Feature } from './entities/feature.entity';
import { BaseController } from '../base/base.controller';
import { ApiBasicAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { TokenGuard } from '../authentication/http/token.guard';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Controller('feature')
@ApiTags('Feature')
export class FeatureController extends BaseController<Feature> {
  constructor(private readonly featureService: FeatureService) {
    super(featureService);
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: CreateFeatureDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('')
  @UseGuards(TokenGuard)
  async create(@Body() entity: Feature): Promise<number> {
    return this.featureService.create(entity);
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: UpdateFeatureDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Put('/:id')
  @UseGuards(TokenGuard)
  async update(@Param('id') id: number, @Body() entity: Feature) {
    return this.featureService.update({
      ...entity,
      id: +id,
    });
  }
}
