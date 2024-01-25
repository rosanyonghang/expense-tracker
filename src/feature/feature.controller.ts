import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FeatureService } from './feature.service';
import { Feature } from './entities/feature.entity';
import { BaseController } from '../base/base.controller';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { TokenGuard } from '../authentication/http/guards/token.guard';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { RolesGuard } from '../authentication/http/guards/roles.guard';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../utils/enums/user.enum';

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
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() entity, @Req() req: any): Promise<number> {
    return this.featureService.create({
      ...entity,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: UpdateFeatureDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Put('/:id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  async update(@Param('id') id: number, @Body() entity: Feature) {
    return this.featureService.update({
      ...entity,
      id: +id,
    });
  }
}
