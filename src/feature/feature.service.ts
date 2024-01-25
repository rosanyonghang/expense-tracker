import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Feature } from './entities/feature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeatureService extends BaseService<Feature> {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {
    super(featureRepository);
  }
}
