import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { Testimonial } from './entities/testimonial.entity';
import { BaseController } from '../base/base.controller';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { TokenGuard } from '../authentication/http/guards/token.guard';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { RolesGuard } from '../authentication/http/guards/roles.guard';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../utils/enums/user.enum';

@Controller('testimonial')
@ApiTags('Testimonial')
@ApiBearerAuth()
export class TestimonialController extends BaseController<Testimonial> {
  constructor(private readonly testimonialService: TestimonialService) {
    super(testimonialService);
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: CreateTestimonialDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() entity, @Req() req: any): Promise<number> {
    return this.testimonialService.create({
      ...entity,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: UpdateTestimonialDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() entity: Testimonial,
    @Req() req: any,
  ) {
    return this.testimonialService.update({
      ...entity,
      id: +id,
      updatedBy: req.user.id,
    });
  }
}
