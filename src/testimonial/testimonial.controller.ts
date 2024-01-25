import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { Testimonial } from './entities/testimonial.entity';
import { BaseController } from '../base/base.controller';
import { ApiBasicAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { TokenGuard } from '../authentication/http/token.guard';

@Controller('testimonial')
@ApiTags('Testimonial')
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
  @Post('')
  @UseGuards(TokenGuard)
  async create(@Body() entity: Testimonial): Promise<number> {
    return this.testimonialService.create(entity);
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
  @Put(':id')
  @UseGuards(TokenGuard)
  async update(@Param('id') id: number, @Body() entity: Testimonial) {
    return this.testimonialService.update({
      id: +id,
      ...entity,
    });
  }
}
