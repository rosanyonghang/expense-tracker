import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Testimonial } from './entities/testimonial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TestimonialService extends BaseService<Testimonial> {
  constructor(
    @InjectRepository(Testimonial)
    private readonly featureRepository: Repository<Testimonial>,
  ) {
    super(featureRepository);
  }
}
