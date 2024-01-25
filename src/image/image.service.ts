import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async createImage(createImageDto: CreateImageDto) {
    return this.imageRepository.create({ ...createImageDto });
  }
}
